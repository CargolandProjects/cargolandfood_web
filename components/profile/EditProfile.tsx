import { User } from "@/lib/services/auth.service";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  useUpdatePersonalInfo,
  useUpdateUser,
} from "@/lib/hooks/mutations/useAuth";
import { RiLoader2Line } from "react-icons/ri";
import { camera } from "@/assets/svgs";
import { uploadImageToCloudinary } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";

interface EditProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: User | null;
  initials: string;
}

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Enter a valid phone number"),
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Full name can only contain letters, spaces, hyphens, and apostrophes"
    ),
});

type EditProfile = z.infer<typeof formSchema>;

const EditProfile = ({
  open,
  onOpenChange,
  session,
  initials,
}: EditProfileProps) => {
  const { mutate, isPending } = useUpdateUser();
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdatePersonalInfo();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { control, handleSubmit } = useForm<EditProfile>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: session?.email,
      fullName: session?.fullName,
      phoneNumber: session?.phoneNumber,
    },
  });

  const onSubmit = (data: EditProfile) => {
    if (!session) return;

    mutate({ id: session.id, payload: { ...data, id: session.id } });
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    try {
      // Upload to Cloudinary
      const imageUrl = await uploadImageToCloudinary(file);

      // Update user profile with new image URL
      updateProfile({ avatarUrl: imageUrl });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Image upload failed"
      );
    } finally {
      setIsUploadingImage(false);
      // Reset file input
      event.target.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog">
        <DialogHeader className="mt-[74px] items-center gap-6">
          <DialogTitle className="dialog-title text-center">
            Edit Profile
          </DialogTitle>
          <div className="relative">
            {/* Profile Image */}
            <Avatar className="size-[99px] border-2 border-gray-200">
              <AvatarImage
                src={session?.avatarUrl}
                alt={session?.fullName}
                className="size-full object-cover"
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {/* Updaate Profile image section */}
            <label
              htmlFor="avatar-upload"
              className="size-9.5 flex justify-center items-center rounded-lg absolute -bottom-1.5 right-0 bg-[#F5F5FF] cursor-pointer hover:bg-[#E8E8FF] transition-colors"
            >
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploadingImage || isUpdating}
              />
              {isUploadingImage ? (
                <RiLoader2Line className="size-5 animate-spin text-primary-600" />
              ) : (
                <img
                  src={camera.src}
                  alt="camera icon"
                  className="h-[17px] w-5  object-cover"
                />
              )}
            </label>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
          <FieldSet>
            <FieldGroup className="gap-6">
              <Controller
                name="fullName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="field">
                    <FieldLabel className="form-label">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input"
                      placeholder="Home"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="field">
                    <FieldLabel className="form-label">Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input"
                      placeholder="example@gmail.com"
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phoneNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="field">
                    <FieldLabel className="form-label">Phone Number</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input"
                      placeholder="+234 080000000000"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
          <div className="px-[7.5px]">
            <Button
              type="submit"
              className="mt-6 submit-btn mb-4.5"
              disabled={isPending}
            >
              {isPending ? (
                <RiLoader2Line className="size-5 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
