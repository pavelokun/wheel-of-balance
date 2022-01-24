import { Button, HStack } from "@chakra-ui/react";
import { Card } from "./Card";
import Slider from "./Slider";

function SliderPanel({
  data,
  onChange,
  editSpheres,
  uploadChanges,
  isSaveDisabled,
}) {
  return (
    <Card w="sm" mx="auto">
      {data?.sectors?.map((sector) => (
        <Slider
          key={sector.id}
          sector={sector}
          onSliderChange={(value) => onChange(sector.id, value)}
        />
      ))}
      <HStack justify={"space-between"} mt={4}>
        <Button colorScheme="teal" variant="outline" onClick={editSpheres}>
          Edit Spheres
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          disabled={isSaveDisabled}
          onClick={uploadChanges}
        >
          Save Changes
        </Button>
      </HStack>
    </Card>
  );
}

export default SliderPanel;
