import React, { useState } from "react";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvAPI } from "../api";
import HorizontalList from "../components/HorizontalList";
import Loader from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();

  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ["tv", "today"],
    tvAPI.airingToday
  );
  const { isLoading: topLoading, data: topData } = useQuery(
    ["tv", "top"],
    tvAPI.topRated
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvAPI.trending
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HorizontalList title="Trending TV" data={trendingData.results} />
      <HorizontalList title="Airing Today" data={todayData.results} />
      <HorizontalList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;