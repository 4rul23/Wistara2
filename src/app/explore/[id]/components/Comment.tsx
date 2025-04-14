"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { Inter, Space_Grotesk } from "next/font/google";
import { mockUsers, getCommentAuthor } from '@/app/data/users';
import {
  Comment as CommentType,
  getCommentsByDestinationId,
  addComment,
  generateCommentsForDestination
} from '@/app/data/comments';

// Font configuration
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface UserCommentsProps {
  destinationId: string;
  destinationName: string;
}

const UserComments = ({ destinationId, destinationName }: UserCommentsProps) => {
  const { isLoggedIn, user } = useAuth();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Number of comments per page
  const COMMENTS_PER_PAGE = 3;

  // Load comments on first render
  useEffect(() => {
    if (!destinationId) return;

    // Check if we have predefined comments for this destination
    let destinationComments = getCommentsByDestinationId(destinationId);

    // If no comments found, generate some
    if (destinationComments.length === 0) {
      destinationComments = generateCommentsForDestination(destinationId, destinationName);
    }

    setComments(destinationComments);
  }, [destinationId, destinationName]);

  // Handle submitting a new comment
  const handleSubmitComment = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    if (!user || !newComment.trim()) return;

    // Add new comment
    const commentData = {
      destinationId,
      userId: user.id,
      text: newComment,
      rating: newRating,
    };

    const newCommentObj = addComment(commentData);

    // Update local state
    setComments(prevComments => [newCommentObj, ...prevComments]);

    // Reset form and go to first page to show the new comment
    setNewComment("");
    setNewRating(5);
    setCurrentPage(1);
  };

  // Calculate pagination info
  const totalPages = Math.max(1, Math.ceil(comments.length / COMMENTS_PER_PAGE));

  // Get comments for current page
  const getCurrentPageComments = () => {
    const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
    return comments.slice(startIndex, startIndex + COMMENTS_PER_PAGE);
  };

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Comments to display based on current page
  const displayedComments = getCurrentPageComments();

  return (
    <div className="mb-16">
      <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-6`}>
        Visitor Reviews ({comments.length})
      </h2>

      {/* Comment form */}
      <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-5">
        <h3 className={`${spaceGrotesk.className} text-lg font-medium mb-4`}>
          Share Your Experience
        </h3>

        <div className="mb-4">
          {/* Rating selector */}
          <div className="flex items-center mb-2">
            <span className={`${inter.className} text-sm text-white/70 mr-3`}>
              Your Rating:
            </span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => isLoggedIn && setNewRating(star)}
                  className={`text-lg ${
                    star <= newRating ? 'text-teal-400' : 'text-white/20'
                  } ${
                    isLoggedIn ? 'cursor-pointer' : 'cursor-default'
                  } focus:outline-none mr-1 transition-colors`}
                  disabled={!isLoggedIn}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment textarea */}
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white/90 placeholder-white/50 focus:outline-none focus:border-teal-500/50 transition-colors"
            placeholder={
              isLoggedIn
                ? "Share your thoughts about this destination..."
                : "Sign in to leave a review"
            }
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!isLoggedIn}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg px-5 py-2 text-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handleSubmitComment}
            disabled={!isLoggedIn || !newComment.trim()}
          >
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments list */}
      {comments.length === 0 ? (
        <p className={`${inter.className} text-white/60 text-center py-8`}>
          Be the first to leave a review!
        </p>
      ) : (
        <div>
          {/* Comment cards */}
          <div className="space-y-4">
            {displayedComments.map((comment) => {
              // Get user data for this comment
              const author = getCommentAuthor(comment.userId);

              return (
                <div
                  key={comment.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-5"
                >
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full mr-3 border border-white/10 flex-shrink-0">
                      <Image
                        src={author.avatar}
                        alt={author.username}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className={`${spaceGrotesk.className} font-medium text-white/95`}>
                        {author.username}
                      </div>
                      <div className="flex items-center flex-wrap">
                        <div className="flex mr-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${
                                i < comment.rating ? 'text-teal-400' : 'text-white/20'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className={`${inter.className} text-xs text-white/50`}>
                          {comment.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className={`${inter.className} text-white/80 text-sm leading-relaxed`}>
                    {comment.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <span className={`${inter.className} text-sm text-white/70`}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAuthModal(false)}
        >
          <div
            className="bg-gradient-to-br from-[#1a1a1a] to-[#101010] border border-white/10 rounded-xl p-6 sm:p-8 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`${spaceGrotesk.className} text-xl font-semibold mb-3 text-white`}>
              Sign in required
            </h3>
            <p className={`${inter.className} text-white/70 mb-6`}>
              Please sign in to your account to leave reviews and share your ratings.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                className="w-full bg-teal-500/80 hover:bg-teal-500/90 py-2.5 rounded-lg text-black font-medium text-sm transition-colors"
                onClick={() => window.location.href = '/login'}
              >
                Sign in
              </button>
              <button
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-lg text-white/70 text-sm transition-colors"
                onClick={() => setShowAuthModal(false)}
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserComments;
