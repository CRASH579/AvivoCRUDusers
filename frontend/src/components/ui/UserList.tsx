import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Stack,
  Spinner,
  Alert,
  Button,
  Input,
  Show,
  Flex,
} from "@chakra-ui/react";
import { toaster } from "./toaster";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  companyName: string;
  role: string;
  country: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dummyUsers, setDummyUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    companyName: "",
    role: "",
    country: "",
  });

  const fetchUsers = () => {
    setLoading(true);
    setError("");

    axios
      .get<User[]>("http://localhost:3000/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  if (loading) return <Spinner size="xl" color="blue.500" />;
  if (error)
    return (
      <Alert.Root status="error" title="Error">
        <Alert.Indicator />
        <Alert.Title>Something went Wrong</Alert.Title>
      </Alert.Root>
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addUser = (userToAdd: User) => {
    const localUser = {
      ...userToAdd,
      id: Math.floor(Math.random() * 10000),
    };
    setUsers((prev) => [localUser, ...prev]);
    toaster.create({
      description: "User added locally (not saved to database)",
      type: "info",
    });
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id)); 
      setError(""); 
    } catch (error) {
      setError("Failed to delete user");
      console.error(error);
    }
  };

  const handleDummyJson = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("https://dummyjson.com/users");
      const firstTen = res.data.users
        .slice(0, 10)
        .map((user: Record<string, any>) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.company?.name || "Unknown",
          role: user.company?.title || "N/A",
          country: user.address?.country || "N/A",
        }));
      setDummyUsers(firstTen);
    } catch (error: unknown) {
      setError("Failed to fetch dummy users");
      console.error("DummyJSON fetch error:", error);
    } finally {
      setLoading(false);
    }
  };


  const addToLocal = async (user: User) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/users/create", {
        firstName: user.firstName,
        lastName: user.lastName,
        companyName: user.companyName || "",
        role: user.role || "",
        country: user.country || "",
      });
      await fetchUsers(); 
      setShowForm(false);
      setNewUser({
        id: 0,
        firstName: "",
        lastName: "",
        companyName: "",
        role: "",
        country: "",
      });
    } catch (error: unknown) {
      console.error("Failed to add user to local DB:", error);
    } finally {
      setLoading(false);
    }
  };


  const addToForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.firstName || !newUser.lastName) {
      toaster.create({
        description: "First name and last name are required",
        type: "error",
        closable: true,
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/users/create", {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        companyName: newUser.companyName,
        role: newUser.role,
        country: newUser.country,
      });

      toaster.create({
        description: "User added successfully",
        type: "success",
      });

      await fetchUsers();
      setShowForm(false);
      setNewUser({
        id: 0,
        firstName: "",
        lastName: "",
        companyName: "",
        role: "",
        country: "",
      });
    } catch (error) {
      toaster.create({
        description: "Failed to add user",
        type: "error",
      });
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Box>
        <Heading size="lg" mb={4}>
          User List
        </Heading>
        <Input
          placeholder="Search by name, company, role, or country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={4}
        />
        <Stack wordSpacing={4}>
          {users
            .filter((user) => {
              const term = searchTerm.toLowerCase();
              return (
                user.firstName.toLowerCase().includes(term) ||
                user.lastName.toLowerCase().includes(term) ||
                user.companyName.toLowerCase().includes(term) ||
                user.role.toLowerCase().includes(term) ||
                user.country.toLowerCase().includes(term)
              );
            })
            .map((user) => (
              <Box
                key={user.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                background="grey"
              >
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text>
                      <strong>Name:</strong> {user.firstName} {user.lastName}
                    </Text>
                    <Text>
                      <strong>Company:</strong> {user.companyName}{" "}
                    </Text>
                    <Text>
                      <strong>Role:</strong> {user.role}{" "}
                    </Text>
                    <Text>
                      <strong>Country:</strong> {user.country}{" "}
                    </Text>
                  </Box>
                  <Button
                    onClick={() => deleteUser(user.id)}
                  >
                    🗑️ Delete
                  </Button>
                </Flex>
              </Box>
            ))}
        </Stack>
      </Box>
      {dummyUsers.length > 0 && (
        <>
          <Heading size="md" mt={6} mb={2}>
            Dummy Users
          </Heading>
          {dummyUsers.map((user) => (
  <Box
    key={`dummy-${user.id}`}
    p={4}
    shadow="md"
    borderWidth="1px"
    borderRadius="md"
    mb={2}
    className="dark"
  >
    <Flex justify="space-between" align="center">
      <Box>
        <Text fontWeight="bold">
          {user.firstName} {user.lastName}
        </Text>
        <Text>
          {user.companyName} • {user.role} • {user.country}
        </Text>
      </Box>
      <Stack direction="row" wordSpacing={2}>
        <Button
          onClick={() => addToLocal(user)}
        >
         Add to DB
        </Button>
      </Stack>
    </Flex>
  </Box>
))}
        </>
      )}
      <Stack direction="row">
        <Button
          my={4}
          onClick={() => {
            setShowForm(true);
          }}
          disabled={showForm}
        >
          Add User
        </Button>
        <Button my={4} onClick={fetchUsers} disabled={loading}>
          🔄 {loading ? "Refreshing..." : "Refresh Users"}
        </Button>
        <Button background="green" my={4} onClick={handleDummyJson}>
          {" "}
          Show Dummy Json Data
        </Button>
      </Stack>

      <Show when={showForm}>
        <Box mb={6}>
          <Heading size="md" mb={2}>
            Add New User
          </Heading>
          <Stack direction="column" wordSpacing={2} as="form" onSubmit={addToForm}>
            <Input
              placeholder="First Name"
              name="firstName"
              value={newUser.firstName}
              onChange={handleChange}
            />
            <Input
              placeholder="Last Name"
              name="lastName"
              value={newUser.lastName}
              onChange={handleChange}
            />
            <Input
              placeholder="Company Name"
              name="companyName"
              value={newUser.companyName}
              onChange={handleChange}
            />
            <Input
              placeholder="Role"
              name="role"
              value={newUser.role}
              onChange={handleChange}
            />
            <Input
              placeholder="Country"
              name="country"
              value={newUser.country}
              onChange={handleChange}
            />
            <Stack direction="row" wordSpacing={2}>
              <Button type="submit">
                ➕ Add User to DB
              </Button>
              <Button
                onClick={() => addUser(newUser)}
              >
                ➕ Add User to UI
              </Button>
              <Button
                onClick={() => {
                  setShowForm(false);
                  setNewUser({
                    id: 0,
                    firstName: "",
                    lastName: "",
                    companyName: "",
                    role: "",
                    country: "",
                  });
                }}
              >
                ❌ Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Show>
    </>
  );
};

export default UserList;
