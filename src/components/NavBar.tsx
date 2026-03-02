import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar = ({ setLocation }: Props) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (!input.trim()) return;

    setLocation(input.trim());
    setInput("");
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
      <Input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        w={{ base: "60%", lg: "30%" }}
        placeholder="Search Location..."
      />
      <Button onClick={handleSearch} colorScheme="blue" w="5%">
        <i className="bi bi-search"></i>
      </Button>
    </Box>
  );
};

export default NavBar;
