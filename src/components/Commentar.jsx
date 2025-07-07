import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { getDocs, addDoc, collection, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-comment";
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Comment = memo(({ comment, formatDate }) => (
  <div className="px-4 pt-4 pb-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group hover:shadow-lg hover:-translate-y-0.5">
    <div className="flex items-start gap-3">
      {comment.profileImage ? (
        <img
          src={comment.profileImage}
          alt={`${comment.userName}'s profile`}
          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30"
          loading="lazy"
        />
      ) : (
        <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
          <UserCircle2 className="w-5 h-5" />
        </div>
      )}
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h4 className="font-medium text-white truncate">{comment.userName}</h4>
          <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="text-gray-300 text-sm break-words leading-relaxed">{comment.content}</p>
      </div>
    </div>
  </div>
));

const CommentForm = memo(({ onSubmit, isSubmitting }) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleTextareaChange = useCallback((e) => {
    setNewComment(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!newComment.trim() || !userName.trim()) return;
      onSubmit({ newComment, userName, imageFile });
      setNewComment("");
      setImagePreview(null);
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    },
    [newComment, userName, imageFile, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-white text-sm">Name *</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          required
        />
      </div>

      <div>
        <label className="text-white text-sm">Message *</label>
        <textarea
          ref={textareaRef}
          value={newComment}
          onChange={handleTextareaChange}
          placeholder="Write your message here..."
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none min-h-[120px]"
          required
        />
      </div>

      <div>
        <label className="text-white text-sm">Profile Photo (optional)</label>
        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/50" />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
              >
                <X className="w-4 h-4" />
                Remove Photo
              </button>
            </>
          ) : (
            <div className="w-full">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500/20 text-indigo-400 border border-dashed border-indigo-500/50 rounded-xl hover:bg-indigo-500/30"
              >
                <ImagePlus className="w-5 h-5" />
                Choose Profile Photo
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95 disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
});

const Komentar = () => {
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ once: false });
    const q = query(collection(db, "portfolio-comments"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const uploadImage = useCallback(async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `profile-images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }, []);

  const handleCommentSubmit = useCallback(async ({ newComment, userName, imageFile }) => {
    setError("");
    setIsSubmitting(true);
    try {
      const profileImageUrl = await uploadImage(imageFile);
      await addDoc(collection(db, "portfolio-comments"), {
        content: newComment,
        userName,
        profileImage: profileImageUrl,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
      setError("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [uploadImage]);

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const diffMs = Date.now() - date.getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl backdrop-blur-xl shadow-xl">
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-500/20">
          <MessageCircle className="w-6 h-6 text-indigo-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">
          Comments <span className="text-indigo-400">({comments.length})</span>
        </h3>
      </div>

      <div className="p-6 space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} />

        <div className="space-y-4 h-[300px] overflow-y-auto custom-scrollbar">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <UserCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              No comments yet. Start the conversation!
            </div>
          ) : (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} formatDate={formatDate} />
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default Komentar;
