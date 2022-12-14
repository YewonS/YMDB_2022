
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { Movie } from "../api";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  font-size: 12px;
  margin-vertical: 10px;
  font-weight: 500;
  opacity: 0.6;
`;

const Title = styled.Text`
  font-weight: 600;
  margin-top: 7px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
  fullData: Movie;
}

const HorizontalMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
  fullData,
}) => {

  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        originalTitle,
        ...fullData,
      },
    });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
    <HMovie>
      <Poster path={posterPath} />
      <HColumn>
        <Title>
          {originalTitle.length > 30
            ? `${originalTitle.slice(0, 30)}...`
            : originalTitle}
        </Title>
        {releaseDate ? (
          <Release>
            Release Date: {new Date(releaseDate).toLocaleDateString("dk")}
          </Release>
        ) : null}
        {voteAverage ? <Votes votes={voteAverage} /> : null}
        <Overview>
          {overview !== "" && overview.length > 140
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
      </HColumn>
    </HMovie>
    </TouchableOpacity>
  );
};

export default HorizontalMedia;