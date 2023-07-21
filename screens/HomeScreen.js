import { StyleSheet, View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Card } from "react-native-paper";

const url = "https://jsonplaceholder.typicode.com/posts";

const HomeScreen = ({ navigation }) => {
  const posts = [];
  const [data, setData] = useState(posts);
  const [loading, setLoading] = useState(true);
  const [addNews, setAddNews] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style="styles.container">
      <Button
        title="AddNews"
        icon="camera"
        mode="Elevated"
        onPress={(addNews) => {
          setAddNews(navigation.navigate("AddNews"));
        }}>
        Add News Mzansi Journalist
      </Button>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, posts }) => {
          return (
            <Card>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <Card.Title title={item.title} />
              <Card.Content>
                <Text variant="bodyMedium">{item.body}</Text>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default HomeScreen;
