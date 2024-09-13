import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createTicket } from "../../data/mockData"; // Import the createTicket function

const NewTicketForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log("Form values:", values); // Log form values
    try {
      // Prepare the data according to the API schema
      const ticketData = {
        user_id: values.userId, // Ensure this matches the expected field in your API
        type: values.type,
        from_date: values.fromDate,
        to_date: values.toDate,
        description: values.description,
      };

      const createdTicket = await createTicket(ticketData);
      if (createdTicket) {
        console.log("Ticket created successfully:", createdTicket);
        alert('Ticket created successfully');
        resetForm(); // Reset form fields after successful submission
      } else {
        console.error("Failed to create ticket");
        alert('Failed to create ticket');
      }
    } catch (error) {
      console.error("Error during ticket creation:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE TICKET" subtitle="Create a New Ticket" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={ticketSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue, // To set the field value programmatically
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="User ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userId}
                name="userId"
                color="secondary"
                error={!!touched.userId && !!errors.userId}
                helperText={touched.userId && errors.userId}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  name="type"
                  value={values.type}
                  onChange={(e) => setFieldValue("type", e.target.value)}
                  onBlur={handleBlur}
                  color="secondary"
                  error={!!touched.type && !!errors.type}
                >
                  <MenuItem value="WFH">WFH</MenuItem>
                  <MenuItem value="Leave">Leave</MenuItem>
                  <MenuItem value="Late">Late</MenuItem>
                </Select>
                {touched.type && errors.type && <div>{errors.type}</div>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="From Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fromDate}
                name="fromDate"
                color="secondary"
                error={!!touched.fromDate && !!errors.fromDate}
                helperText={touched.fromDate && errors.fromDate}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="To Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.toDate}
                name="toDate"
                color="secondary"
                error={!!touched.toDate && !!errors.toDate}
                helperText={touched.toDate && errors.toDate}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                color="secondary"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Request
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// Validation schema
const ticketSchema = yup.object().shape({
  userId: yup.number().required("User ID is required"),
  type: yup.string().oneOf(["WFH", "Leave", "Late"], "Invalid type").required("Type is required"),
  fromDate: yup.string().required("From Date is required"),
  toDate: yup.string().required("To Date is required"),
  description: yup.string().required("Description is required"),
});

// Initial form values
const initialValues = {
  userId: "",
  type: "",
  fromDate: "",
  toDate: "",
  description: "",
};

export default NewTicketForm;
