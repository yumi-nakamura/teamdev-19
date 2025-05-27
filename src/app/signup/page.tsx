"use client";
import SignUpForm from "@/components/SignUpForm";
import { withGuestOnly } from "@/libs/withAuth";

export default withGuestOnly(SignUpForm);

