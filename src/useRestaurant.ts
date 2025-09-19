import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, onSnapshot, collection, query, orderBy } from "firebase/firestore";

export type SocialKey = "instagram" | "youtube" | "tiktok" | "facebook" | "linkedin";
export type Socials = Partial<Record<SocialKey, string>>;

export interface Restaurant {
  name?: string;
  aboutHtml?: string;
  googleBusinessUrl?: string | null;
  videoUrl?: string | null;
  socials?: Socials;
  headerImageUrl?: string | null;
  isVisible?: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  sortOrder: number;
}

export interface PasswordItem {
  id: string;
  title: string;
  value: string;
  hidden: boolean;
  sortOrder: number;
}

type GalleryDoc = { url?: string; sortOrder?: number };
type PasswordDoc = {
  title?: string;
  value?: string;
  hidden?: boolean;
  sortOrder?: number;
};

export function useRestaurant(restId: string) {
  const [res, setRes] = useState<Restaurant>({} as Restaurant);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [pwds, setPwds] = useState<PasswordItem[]>([]);

  useEffect(() => {
    if (!restId) return;

    const unsubRes = onSnapshot(doc(db, "restaurants", restId), (snap) => {
      setRes((snap.data() as Restaurant) ?? {});
    });

    const unsubGal = onSnapshot(
      query(
        collection(db, "restaurants", restId, "gallery"),
        orderBy("sortOrder", "asc")
      ),
      (snap) => {
        const rows: GalleryItem[] = snap.docs.map((d) => {
          const data = d.data() as GalleryDoc;
          return {
            id: d.id,
            url: data.url ?? "",
            sortOrder: data.sortOrder ?? 0,
          };
        });
        setGallery(rows);
      }
    );

    const unsubPwd = onSnapshot(
      query(
        collection(db, "restaurants", restId, "passwords"),
        orderBy("sortOrder", "asc")
      ),
      (snap) => {
        const rows: PasswordItem[] = snap.docs.map((d) => {
          const data = d.data() as PasswordDoc;
          return {
            id: d.id,
            title: data.title ?? "",
            value: data.value ?? "",
            hidden: Boolean(data.hidden),
            sortOrder: data.sortOrder ?? 0,
          };
        });
        setPwds(rows);
      }
    );

    return () => {
      unsubRes();
      unsubGal();
      unsubPwd();
    };
  }, [restId]);

  return { res, gallery, pwds };
}
