"use client";

import { useEffect, useState } from "react";
import CourseReader from "@/components/CourseReader";
import LoadingSpinner from "@/components/LoadingSpinner";
import { use } from "react";
import Navbar from "@/components/Navbar";
export default function CourseViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${resolvedParams.slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Une erreur est survenue");
        }

        setCourse(data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [resolvedParams.slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !course) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="">
      <Navbar />
      <CourseReader course={course} />
    </div>
  );
}
