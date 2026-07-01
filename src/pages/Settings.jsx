import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, LogOut, Trash2, Camera, TriangleAlert } from 'lucide-react';
import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const handleAvatarChange = async (file) => {
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    await base44.auth.updateMe({ avatar_url: file_url });
    setUser(u => ({ ...u, avatar_url: file_url }));
    setUploading(false);
  };

  const handleSignOut = () => {
    base44.auth.logout('/');
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await base44.auth.deleteAccount();
    } catch (_) {
      // proceed to redirect regardless
    }
    base44.auth.redirectToLogin();
  };

  return (
    <div
      className="min-h-screen bg-background pb-20"
      style={{ paddingTop: 'calc(2.5rem + env(safe-area-inset-top, 0px))' }}
    >
      <div className="flex items-center gap-3 px-6 pb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-muted/60">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Settings</h1>
      </div>

      <div className="px-6 space-y-4">
        {/* Profile section */}
        {user && (
          <div className="p-5 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative shrink-0">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-border hover:border-primary/40 transition-colors"
                >
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-7 h-7 text-primary" />
                  )}
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow"
                >
                  <Camera className="w-2.5 h-2.5 text-primary-foreground" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleAvatarChange(e.target.files[0])}
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{user.full_name || 'User'}</p>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                <p className="text-xs text-primary mt-0.5 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  {uploading ? 'Uploading...' : 'Tap photo to change'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 rounded-full"
              onClick={() => navigate('/onboarding')}
            >
              Edit Profile
            </Button>
          </div>
        )}

        {/* Sign out */}
        <Button
          variant="outline"
          className="w-full rounded-full gap-2 h-11"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>

        {/* Medical Disclaimer */}
        <div className="flex gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <TriangleAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">For informational purposes only.</span> Carena is designed to help you understand products and ingredients, and works best alongside your dermatologist or healthcare professional. It does not substitute medical advice, diagnosis, or treatment.
          </p>
        </div>

        {/* Delete account */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">Danger Zone</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full rounded-full gap-2 h-11"
                disabled={deleting}
              >
                <Trash2 className="w-4 h-4" />
                {deleting ? 'Deleting...' : 'Delete Account'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your account and all your product data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}