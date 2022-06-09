import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
});

const TemplatePdf = () => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          azezrezrzeezeazeazeazeazeazeazeazes
        </Text>
      </Page>
    </Document>
  );
};

export default TemplatePdf;
