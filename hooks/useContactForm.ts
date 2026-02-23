"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { ContactFormValues, contactFormSchema } from "@/lib/validations";
import { submitContactForm, resetContactState } from "@/store/slices/contactSlice";
import { RootState, AppDispatch } from "@/store";
import { useState, useEffect } from "react";

export function useContactForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage } = useSelector((state: RootState) => state.contact);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitted(false);
    await dispatch(submitContactForm(data));
  };

  useEffect(() => {
    if (status === "success") {
      setIsSubmitted(true);
      form.reset();
      const timeout = setTimeout(() => {
        dispatch(resetContactState());
        setIsSubmitted(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [status, dispatch, form]);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    status,
    errorMessage,
    isSubmitted,
  };
}
