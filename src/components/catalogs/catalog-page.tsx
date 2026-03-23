"use client";

import { useState, useCallback } from "react";
import EmailGate from "./email-gate";
import CatalogViewer from "./catalog-viewer";

interface ProjectSpec {
  label: string;
  value: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  specs: ProjectSpec[];
}

interface Catalog {
  title: string;
  description: string;
  slug: string;
}

interface CatalogPageProps {
  catalog: Catalog;
  projects: Project[];
}

export default function CatalogPage({ catalog, projects }: CatalogPageProps) {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = useCallback(() => {
    setUnlocked(true);
  }, []);

  return (
    <>
      {!unlocked && (
        <EmailGate
          catalogTitle={catalog.title}
          catalogSlug={catalog.slug}
          onUnlock={handleUnlock}
        />
      )}
      {unlocked && <CatalogViewer catalog={catalog} projects={projects} />}
    </>
  );
}
