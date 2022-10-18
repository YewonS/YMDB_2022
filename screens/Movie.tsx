import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import HorizontalMedia from "../components/HorizontalMedia";
import VerticalMedia from "../components/VerticalMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesAPI, MovieResponse } from "../api";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;
const VerticalSeparator = styled.View`
  width: 20px;
`;
const HorizontalSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesAPI.upcoming);

  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesAPI.trending);

  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  const movieKeyExtractor = (item) => item.id + "";
  
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
    <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListHeaderComponent={
        <>
            <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
                marginBottom: 40,
                width: "100%",
                height: SCREEN_HEIGHT / 4,
            }}
            >
            {nowPlayingData?.results.map((movie) => (
                <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                />
            ))}
            </Swiper>
            <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
                data={trendingData?.results}
                horizontal
                keyExtractor={movieKeyExtractor}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 30 }}
                ItemSeparatorComponent={VerticalSeparator}
                renderItem={({ item }) => (
                <VerticalMedia
                    posterPath={item.poster_path}
                    originalTitle={item.original_title}
                    voteAverage={item.vote_average}
                />
                )}
            />
            </ListContainer>
            <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
        }
        data={upcomingData?.results}
        keyExtractor={movieKeyExtractor}
        ItemSeparatorComponent={HorizontalSeparator}
        renderItem={({ item }) => (
        <HorizontalMedia
            posterPath={item.poster_path || ""}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
        />
        )}
    />
    );
};

export default Movies;