import { getPostDetail, getRecommendedPosts } from "@/lib/api";
import PostDetail from "@/components/PostDetail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostDetail(Number(id));
  const recommended = await getRecommendedPosts(1, 5);

  const anotherPost = recommended.data.find((p: any) => p.id !== post.id);

  return <PostDetail post={post} anotherPost={anotherPost} />;
}
