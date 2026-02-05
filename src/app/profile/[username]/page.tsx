import { getPublicProfileByUsername } from "@/lib/api";
import ProfilePostItem from "@/components/profile/ProfilePostItem";
import EmptyPost from "@/components/profile/EmptyPost";
import Avatar from "@/components/common/Avatar";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;

  const profile = await getPublicProfileByUsername(username);

  const posts = profile.posts?.data ?? [];

  return (
    <main className="px-4 pt-4 pb-20 max-w-200 mx-auto">
      {/* ===== PROFILE HEADER ===== */}
      <div className="flex items-center gap-3 mb-6">
        <Avatar
          src={
            profile.avatarUrl
              ? `https://be-blg-production.up.railway.app${profile.avatarUrl}`
              : null
          }
          alt={profile.name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="text-xs text-gray-500">{profile.headline}</p>
        </div>
      </div>

      {/* ===== POST COUNT ===== */}
      <h2 className="font-semibold mb-3">{posts.length} Post</h2>

      {/* ===== POSTS ===== */}
      {posts.length === 0 ? (
        <EmptyPost />
      ) : (
        <div className="space-y-4">
          {posts.map((post: any) => (
            <ProfilePostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
