import React from "react";
import { View, Image } from "react-native";
import type { GalleryItem } from "../useRestaurant";
import { colors } from "../theme/colors";

export default function GalleryList({ items }: { items: GalleryItem[] }) {
  const list = [...items].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <View style={{ gap: 12 }}>
      {list.map((g) => (
        <View
          key={g.id}
          style={{
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.line,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: g.url }} style={{ width: "100%", aspectRatio: 16 / 9 }} resizeMode="cover" />
        </View>
      ))}
    </View>
  );
}
