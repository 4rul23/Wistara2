"use client";

import { useState, useEffect } from 'react';
import { useAuth } from "@/app/context/AuthContext";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from 'next/link';
import Image from 'next/image';

// Font configuration
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function UserCommentsPage() {
  const { isLoggedIn, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      window.location.href = '/login';
      return;
    }

    const fetchUserComments = async () => {
      try {
        const response = await fetch('/api/comments/user');
        if (!response.ok) throw new Error('Failed to fetch comments');

        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error('Error fetching user comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserComments();
  }, [isLoggedIn, user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className={`${spaceGrotesk.className} text-3xl font-bold mb-6`}>
        Your Reviews
      </h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8 text-center">
          <p className={`${inter.className} text-lg text-white/70 mb-4`}>
            You haven't left any reviews yet.
          </p>
          <Link
            href="/explore"
            className="inline-block bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg px-5 py-2 text-teal-300 transition-colors"
          >
            Explore destinations
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-5"
            >
              <div className="flex justify-between items-start mb-4">
                <Link href={`/explore/${comment.destinationId}`} className="group">
                  <h3 className={`${spaceGrotesk.className} text-xl font-semibold text-white/90 group-hover:text-teal-400 transition-colors`}>
                    {comment.destinationName || comment.destinationId}
                  </h3>
                </Link>
                <span className={`${inter.className} text-xs text-white/50`}>{new Date(comment.date).toLocaleDateString()}</span>
              </div>

              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < comment.rating ? 'text-teal-400' : 'text-white/20'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className={`${inter.className} text-white/80 mb-4`}>
                {comment.text}
              </p>

              <div className="flex justify-end gap-2">
                <button
                  className="text-white/50 hover:text-white/80 text-sm transition-colors"
                  onClick={() => {/* Implement edit functionality */}}
                >
                  Edit
                </button>
                <button
                  className="text-red-400/70 hover:text-red-400 text-sm transition-colors"
                  onClick={() => {/* Implement delete functionality */}}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
