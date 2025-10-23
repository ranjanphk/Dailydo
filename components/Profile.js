import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function Profile({ name: initialName, phone: initialPhone }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  // Load user profile data
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const ref = doc(db, 'profiles', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || '');
        setPhone(data.phone || '');
      }
    };
    fetchData();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const ref = doc(db, 'profiles', user.uid);
    await setDoc(ref, { name, phone, email: user.email }, { merge: true });
    setSaving(false);
    alert('Profile updated');
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center text-xl font-bold rounded-full">
          {name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <p className="font-medium">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-ful dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200 rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            className="w-full dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200 rounded p-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
