import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";
import CustomKeyboard from "../components/custom/CustomKeyboard";

export default function Section({
  title,
  children,
  editable = false,
  onEdit,
  currentValue = "",
}: {
  title: string;
  children: React.ReactNode;
  editable?: boolean;
  onEdit?: (value: string) => void;
  currentValue?: string;
}) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  return (
    <View style={{ marginTop: 14 }}>
      <TouchableOpacity
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}
        disabled={!editable}
        onPress={() => editable && onEdit && setKeyboardVisible(true)}
      >
        <Text style={{ color: colors.sub, fontSize: 13 }}>{title}</Text>
        {editable && <Text style={{ color: "#007AFF", fontSize: 12 }}>Edit</Text>}
      </TouchableOpacity>
      {children}
      {editable && onEdit && (
        <CustomKeyboard
          isVisible={keyboardVisible}
          onClose={() => setKeyboardVisible(false)}
          onTextChange={onEdit}
          initialText={currentValue}
          placeholder={`Enter ${title.toLowerCase()}...`}
        />
      )}
    </View>
  );
}
