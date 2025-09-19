import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { colors } from "../theme/colors";
import type { PasswordItem } from "../useRestaurant";

export default function PasswordCard({
  password,
  onToggleVisibility,
}: {
  password: PasswordItem;
  onToggleVisibility: (id: string) => void;
}) {
  return (
    <TouchableOpacity
      onPress={() => onToggleVisibility(password.id)}
      style={{
        backgroundColor: colors.chip,
        borderWidth: 1,
        borderColor: colors.line,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.sub, fontSize: 12, marginBottom: 6 }}>{password.title}</Text>
        <Text style={{ color: colors.ink, fontWeight: "600" }}>
          {password.hidden ? "••••••••" : password.value}
        </Text>
      </View>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: password.hidden ? colors.sub : colors.success,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 12 }}>👁</Text>
      </View>
    </TouchableOpacity>
  );
}
