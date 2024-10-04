import { useState, useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useClerkSupabaseClient } from "@/utils/clerk";

const slugAvailableAtom = atom<boolean | null>(null);
const slugCheckingAtom = atom(false);
const slugErrorAtom = atom<string | null>(null);

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
};

export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};

export const useComponentSlug = () => {
  const [slugAvailable, setSlugAvailable] = useAtom(slugAvailableAtom);
  const [slugChecking, setSlugChecking] = useAtom(slugCheckingAtom);
  const [slugError, setSlugError] = useAtom(slugErrorAtom);
  const client = useClerkSupabaseClient();

  const checkSlugUnique = async (slug: string): Promise<boolean> => {
    const { data, error } = await client
      .from("components")
      .select("id")
      .eq("component_slug", slug);

    if (error) {
      console.error("Error checking slug uniqueness:", error);
      return false;
    }

    return data?.length === 0;
  };

  const generateUniqueSlug = useCallback(async (baseName: string) => {
    let newSlug = generateSlug(baseName);
    let isUnique = await checkSlugUnique(newSlug);
    let suffix = 1;

    while (!isUnique) {
      newSlug = `${generateSlug(baseName)}-${suffix}`;
      isUnique = await checkSlugUnique(newSlug);
      suffix += 1;
    }

    return newSlug;
  }, []);

  const checkSlug = async (slug: string) => {
    setSlugChecking(true);
    setSlugError(null);

    if (!isValidSlug(slug)) {
      setSlugAvailable(false);
      setSlugError("Invalid slug format");
    } else {
      const isUnique = await checkSlugUnique(slug);
      setSlugAvailable(isUnique);
      if (!isUnique) {
        setSlugError("This slug is already taken");
      }
    }

    setSlugChecking(false);
  };

  return {
    slugAvailable,
    slugChecking,
    slugError,
    checkSlugUnique,
    generateUniqueSlug,
    checkSlug,
  };
};