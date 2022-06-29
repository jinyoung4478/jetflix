import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "./utils";

const Wrapper = styled.div`
    background: black;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${(props) => props.bgPhoto});
    background-position: center;
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 20px;
`;

const Overview = styled.p`
    font-size: 1.0rem;
    width: 50%;
`;

const Slider = styled.div`
    position: relative;
    top: -200px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr);
    margin-bottom: 5px;
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div) <{ bgPhoto: string }>`
    background-color: white;
    background-image: url(${(props) => props.bgPhoto});
    background-position: center center;
    background-size: cover;
    height: 200px;
    font-size: 66px;
    &:first-child{
        transform-origin: center left;
    }
    &:last-child{
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
  padding: 10px  ;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const rowVariants = {
    hidden: {
        x: window.outerWidth + 10,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth - 10,
    },
};

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.3,
            duration: 0.3,
            type: "tween",
        },
    },
};

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 0.3,
            type: "tween",
        },
    },
};

const offset = 6;

function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getMovies,
    );
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data?.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
        }
    };
    const toggleLeaving = () => setLeaving((prev) => !prev)
    return (
        <Wrapper style={{ height: "200vh" }}>
            {isLoading ? (
                <Loader>Loading ... </Loader>
            ) : (
                <>
                    <Banner
                        onClick={increaseIndex}
                        bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                    >
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Slider>
                        <AnimatePresence
                            initial={false}
                            onExitComplete={toggleLeaving}
                        >
                            <Row
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ type: "tween", duration: 1 }}
                                key={index}
                            >
                                {data?.results
                                    .slice(1)
                                    .slice(offset * index, offset * index + offset)
                                    .map((movie) => (
                                        <Box
                                            key={movie.id}
                                            variants={boxVariants}
                                            whileHover="hover"
                                            initial="normal"
                                            transition={{ type: "tween", }}
                                            bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                        >
                                            <Info
                                                variants={infoVariants}>
                                                <h4>{movie.title}</h4>
                                            </Info>
                                        </Box>
                                    ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </>
            )}
        </Wrapper>
    );
};

export default Home;
