import {
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Slider as SliderComponent,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";

function Slider({
  sector,
  onSliderChange,
}: {
  sector: any;
  onSliderChange: (value: number) => void;
}) {
  return (
    <Box>
      <Center>
        <Text fontSize={16}>{sector.title}</Text>
      </Center>
      <SliderComponent
        value={sector.value}
        onChange={onSliderChange}
        aria-label="slider-ex-1"
        max={10}
      >
        <SliderTrack bg={`rgba(${sector.color}, 0.2)`}>
          <SliderFilledTrack bg={`rgba(${sector.color}, 0.6)`} />
        </SliderTrack>
        <SliderThumb />
      </SliderComponent>
    </Box>
  );
}

export default Slider;
