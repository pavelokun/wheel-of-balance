import React, { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  chakra,
  FormControl,
  HStack,
  IconButton,
  Input,
  ModalBody,
  ModalFooter,
  Spacer,
  Stack,
} from "@chakra-ui/react";

import { guid } from "../utils";
import { RGB_COLORS } from "../constants/colors";

function SectorsForm({ data, onSubmit }) {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setFields(data);
  }, [data]);

  const addField = () => {
    const newField = {
      id: guid(),
      title: "",
      value: 1,
      color: RGB_COLORS[fields.length % RGB_COLORS.length],
      timestamp: Date.now(),
      notes: "",
      children: [],
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
  };

  const changeTitle = (e, id) => {
    const newTitle = e.target.value;
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, title: newTitle } : field
    );
    setFields(updatedFields);
  };

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault();
        onSubmit(fields);
      }}
    >
      <ModalBody>
        <Stack spacing="4">
          {fields?.map(({ id, title }) => (
            <HStack key={id} justify={"space-between"}>
              <FormControl id={id}>
                <Input
                  name={title}
                  required
                  value={title}
                  onChange={(e) => changeTitle(e, id)}
                  size="sm"
                />
              </FormControl>
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label={`Delete ${title}`}
                size="sm"
                onClick={() => removeField(id)}
                icon={<DeleteIcon />}
              />
            </HStack>
          ))}
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="outline"
          colorScheme="teal"
          size="lg"
          fontSize="md"
          onClick={fields.length < 20 ? addField : null}
        >
          Add sphere
        </Button>
        <Spacer />
        <Button
          variant="outline"
          type="submit"
          colorScheme="teal"
          size="lg"
          fontSize="md"
        >
          Save
        </Button>
      </ModalFooter>
    </chakra.form>
  );
}

export default SectorsForm;
