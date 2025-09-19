import React from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { colors } from "../theme/colors";

export default function YouTubePlayer({ videoId }: { videoId: string }) {
  return (
    <View
      style={{
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.line,
        backgroundColor: "#000",
      }}
    >
      <YoutubePlayer height={210} videoId={videoId} />
    </View>
  );
}
