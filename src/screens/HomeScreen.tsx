import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Linking,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { colors } from "../theme/colors";
import { useRestaurant } from "../useRestaurant";
import Section from "../components/Section";
import GalleryList from "../components/GalleryList";
import PasswordCard from "../components/PasswordCard";
import YouTubePlayer from "../components/YouTubePlayer";
import SocialBar from "../components/SocialBar";
import { parseYouTubeId } from "../utils/youtube";

const REST_ID = "kaffeewerk";

export default function HomeScreen() {
  const { res, gallery, pwds } = useRestaurant(REST_ID);
  const { width } = useWindowDimensions();

  const [localPwds, setLocalPwds] = useState(pwds);
  useEffect(() => setLocalPwds(pwds), [pwds]);

  const togglePasswordVisibility = useCallback((id: string) => {
    setLocalPwds((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hidden: !p.hidden } : p))
    );
  }, []);

  if (res?.isVisible === false) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.card,
        }}
      >
        <Text style={{ fontSize: 18, color: colors.sub }}>
          This restaurant is hidden.
        </Text>
      </View>
    );
  }

  const videoId = parseYouTubeId(res?.videoUrl);
  const social = res?.socials ?? {};

  return (
    <View style={{ flex: 1, backgroundColor: colors.card }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.chip} />
      {/* header bar */}
      <View
        style={{
          paddingTop: StatusBar.currentHeight || 44,
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: colors.chip,
          borderBottomWidth: 1,
          borderBottomColor: colors.line,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.ink, fontWeight: "600", fontSize: 18 }}>
          Kaffeewerk
        </Text>
        <View
          style={{
            height: 28,
            width: 28,
            borderRadius: 8,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.line,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 14,
              height: 2,
              backgroundColor: colors.ink,
              marginBottom: 2,
            }}
          />
          <View
            style={{
              width: 14,
              height: 2,
              backgroundColor: colors.ink,
              marginBottom: 2,
            }}
          />
          <View style={{ width: 14, height: 2, backgroundColor: colors.ink }} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {res?.headerImageUrl && (
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.line,
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <Image
              source={{ uri: res!.headerImageUrl! }}
              style={{ width: "100%", height: 140 }}
              resizeMode="cover"
            />
            {res?.aboutHtml && (
              <TouchableOpacity style={{ padding: 12 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    marginBottom: 6,
                    color: colors.ink,
                    fontSize: 16,
                  }}
                >
                  Kaffeewerk Restaurant
                </Text>
                <RenderHtml
                  contentWidth={width - 48}
                  source={{ html: res!.aboutHtml! }}
                  baseStyle={{ fontSize: 14, color: colors.sub }}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* service badge */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ECFFF7",
            borderWidth: 1,
            borderColor: "#C9F3E3",
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              height: 18,
              width: 18,
              borderRadius: 9,
              backgroundColor: colors.success,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>✓</Text>
          </View>
          <Text
            style={{
              color: "#19A96A",
              fontWeight: "600",
              fontSize: 13,
              flex: 1,
            }}
          >
            Fast service is our priority – powered by SERVICE-DING.de
          </Text>
        </View>

        {/* Reviews */}
        {res?.googleBusinessUrl ? (
          <Section title="Reviews">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => Linking.openURL(res.googleBusinessUrl!)}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#E7E9F1",
                padding: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: "#EAF2FF",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 18 }}>🏬</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ color: "#0F1728", fontWeight: "600" }}>
                  Open Google Reviews
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ color: "#8B93A7", fontSize: 12 }}
                >
                  {res.googleBusinessUrl}
                </Text>
              </View>

              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: "#EEF3F8",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>↗︎</Text>
              </View>
            </TouchableOpacity>
          </Section>
        ) : null}

        {gallery.length > 0 && (
          <Section title="Gallery">
            <GalleryList items={gallery} />
          </Section>
        )}

        {localPwds.map((p) => (
          <PasswordCard
            key={p.id}
            password={p}
            onToggleVisibility={togglePasswordVisibility}
          />
        ))}

        {videoId && (
          <Section title="Video">
            <YouTubePlayer videoId={videoId} />
          </Section>
        )}
        <SocialBar links={social} />
      </ScrollView>
    </View>
  );
}
