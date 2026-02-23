import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
}

interface ContactState {
  status: "idle" | "loading" | "success" | "error";
  errorMessage: string | null;
}

const initialState: ContactState = {
  status: "idle",
  errorMessage: null,
};

export const submitContactForm = createAsyncThunk(
  "contact/submit",
  async (data: ContactFormData) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit form");
    }

    return response.json();
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.status = "idle";
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = "loading";
        state.errorMessage = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = "error";
        state.errorMessage = action.error.message || "An error occurred";
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
