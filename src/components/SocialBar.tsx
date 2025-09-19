import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import type { Socials } from "../useRestaurant";

type Item = {
  key: keyof Socials | "linkedin";
  icon: React.ComponentProps<typeof FontAwesome6>["name"];
  bg: string;     
  glyph: string;  
};

const ITEMS: Item[] = [
  { key: "instagram", icon: "instagram",   bg: "#E4405F", glyph: "#FFFFFF" },
  { key: "youtube",   icon: "youtube",     bg: "#FF0000", glyph: "#FFFFFF" },
  { key: "tiktok",    icon: "tiktok",      bg: "#000000", glyph: "#FFFFFF" },
  { key: "facebook",  icon: "facebook-f",  bg: "#1877F2", glyph: "#FFFFFF" },
  { key: "linkedin",  icon: "linkedin-in", bg: "#0A66C2", glyph: "#FFFFFF" },
];

export default function SocialBar({
  links,
  standalone = true, 
}: {
  links: Socials;
  standalone?: boolean;
}) {
  const buttons = ITEMS.map((it) => {
    const url = (links as any)[it.key];
    if (!url) return null;

    return (
      <TouchableOpacity
        key={it.key}
        onPress={() => Linking.openURL(url)}
        activeOpacity={0.8}
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,             
          backgroundColor: it.bg,     
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <FontAwesome6 name={it.icon} size={16} color={it.glyph} />
      </TouchableOpacity>
    );
  }).filter(Boolean);

  if (!buttons.length) return null;

  if (!standalone) {
    return (
      <View style={{ flexDirection: "row", columnGap: 12, rowGap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {buttons}
      </View>
    );
  }

  return (
    <View
      style={{
        marginTop: 16,
        backgroundColor: colors.chip,
        borderWidth: 1,
        borderColor: colors.line,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 12,
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.sub, fontSize: 13, marginBottom: 10, textAlign: "center" }}>
        Follow Us on Social Media!
      </Text>

      <View style={{ flexDirection: "row", columnGap: 12, rowGap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {buttons}
      </View>
    </View>
  );
}
