"use server";

import { db } from "@/db/db";
import type { TrendingTopic } from "@/types";

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "to",
  "of",
  "in",
  "on",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "and",
  "or",
  "but",
  "if",
  "then",
  "so",
  "as",
  "than",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "them",
  "his",
  "her",
  "its",
  "my",
  "your",
  "our",
  "their",
  "this",
  "that",
  "these",
  "those",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "can",
  "could",
  "should",
  "may",
  "might",
  "must",
  "just",
  "now",
  "also",
  "very",
  "too",
  "not",
  "no",
  "yes",
  "from",
  "into",
  "over",
  "under",
  "get",
  "got",
  "got",
  "go",
  "going",
  "like",
  "really",
  "actually",
  "thing",
  "things",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "what",
  "which",
  "who",
  "whom",
]);

const toCategory = (count: number): TrendingTopic["category"] => {
  if (count >= 20) return "Trending";
  if (count >= 8) return "Popular";
  return "Topic";
};

function extractTerms(content: string): string[] {
  const cleaned = content
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^\w\s#]/g, " ");

  const words = cleaned.split(/\s+/).filter(Boolean);
  const terms: string[] = [];

  for (const word of words) {
    if (word.startsWith("#") && word.length > 2) {
      terms.push(word); // keep hashtags with #
    } else if (
      word.length >= 4 &&
      !STOPWORDS.has(word) &&
      !/^\d+$/.test(word)
    ) {
      terms.push(word); // regular keywords
    }
  }
  return terms;
}

export const getTrendingTopicsAction = async (): Promise<TrendingTopic[]> => {
  const posts = await db.post.findMany({
    select: { content: true },
    take: 1000,
    orderBy: { createdAt: "desc" },
  });

  const counts = new Map<string, number>();

  for (const post of posts) {
    const seen = new Set<string>(); // dedupe per post
    for (const term of extractTerms(post.content)) {
      if (seen.has(term)) continue;
      seen.add(term);
      counts.set(term, (counts.get(term) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .filter(([, count]) => count >= 2) // ignore one-off words
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([term, postCount]) => ({
      tag: term.replace(/^#/, ""), // tag field stores without #
      postCount,
      category: toCategory(postCount),
    }));
};
