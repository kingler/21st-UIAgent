import { useState, useId, ChangeEvent } from "react"
import { UseFormReturn, useController } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormData } from "../utils"
import { licenses } from "@/lib/licenses"
import { useSubmitFormHotkeys } from "../hotkeys"
import { Input } from "@/components/ui/input"
import { useUser } from "@clerk/nextjs"
import {
  makeSlugFromName,
  useIsCheckSlugAvailable,
} from "../hooks/use-is-check-slug-available"
import { usePrefillAutogeneratedSlug } from "../hooks/use-name-slug-form"

export const ComponentDetailsForm = ({
  form,
  handleSubmit,
  hotkeysEnabled = true,
  isSlugReadOnly = true,
  publishAsUserId,
  showOptionalFields = true,
  placeholderName = "",
  isEditMode = false,
  isSubmitting = false,
}: {
  form: UseFormReturn<FormData>
  handleSubmit?: (event: React.FormEvent) => void
  isSubmitting?: boolean
  hotkeysEnabled?: boolean
  isSlugReadOnly?: boolean
  publishAsUserId?: string
  showOptionalFields?: boolean
  placeholderName?: string
  isEditMode?: boolean
}) => {
  const { user: currentUser } = useUser()
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false)
  const slug = form.watch("component_slug")
  const userId = publishAsUserId ?? currentUser?.id

  const {
    isAvailable: slugAvailable,
    isChecking: isSlugChecking,
    error: slugError,
  } = useIsCheckSlugAvailable({
    slug,
    userId: userId ?? "",
    type: "component",
    enabled: !isSlugReadOnly,
  })

  if (
    slugAvailable !== undefined &&
    form.getValues("slug_available") !== slugAvailable
  ) {
    form.setValue("slug_available", slugAvailable)
  }

  usePrefillAutogeneratedSlug({
    form,
    isSlugReadOnly,
    isSlugManuallyEdited,
    publishAsUserId: userId,
  })

  if (handleSubmit) {
    useSubmitFormHotkeys(form, handleSubmit, hotkeysEnabled)
  }

  const nameId = useId()
  const slugId = useId()
  const descriptionId = useId()
  const registryId = useId()
  const licenseId = useId()
  const websiteId = useId()
  const defaultRows = 3

  const handleTextareaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.style.height = "auto"

    const style = window.getComputedStyle(textarea)
    const borderHeight =
      parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth)

    const newHeight = textarea.scrollHeight + borderHeight

    textarea.style.height = `${newHeight}px`
  }

  const { field: nameField } = useController({
    name: "name",
    control: form.control,
    rules: { required: true },
  })

  const { field } = useController({
    name: "website_url",
    control: form.control,
    defaultValue: "",
    rules: {
      onChange: (e) => {
        const rawValue = e.target.value

        // Remove any protocols from input
        const cleanUrl = rawValue
          .trim()
          .replace(/^(https?:\/\/)+(www\.)?/, "")
          .replace(/\/$/, "")

        // Simple URL validation
        const urlRegex =
          /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](\.[a-zA-Z]{2,})+([/?].*)?$/
        const isValid = urlRegex.test(cleanUrl)

        if (cleanUrl && !isValid) {
          form.setError("website_url", {
            type: "manual",
            message: "Please enter a valid URL",
          })
        } else {
          form.clearErrors("website_url")
        }

        // Store with https:// in form
        const formValue = cleanUrl ? `https://${cleanUrl}` : ""
        return formValue
      },
    },
  })

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={nameId}>
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id={nameId}
            ref={nameField.ref}
            placeholder={`e.g. "${(placeholderName || "Button").replace(/([a-z])([A-Z])/g, "$1 $2")}"`}
            value={nameField.value}
            onChange={nameField.onChange}
            onBlur={nameField.onBlur}
            className="w-full text-foreground"
            required
          />
          <p
            className="text-xs text-muted-foreground"
            role="region"
            aria-live="polite"
          >
            The display name of your component
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor={slugId}>
            Slug <span className="text-destructive">*</span>
          </Label>
          <Input
            id={slugId}
            {...form.register("component_slug", { required: true })}
            className="w-full"
            placeholder={`e.g. "${makeSlugFromName(placeholderName || "Button")}"`}
            disabled={
              isSlugReadOnly || (isSlugChecking && !isSlugManuallyEdited)
            }
            onChange={(e) => {
              setIsSlugManuallyEdited(true)
              form.setValue("component_slug", e.target.value)
            }}
            required
          />
          <p
            className="text-xs text-muted-foreground"
            role="region"
            aria-live="polite"
          >
            Used in the URL and imports, can't be changed later
          </p>
        </div>
      </div>

      {slugError && (
        <p className="text-red-500 text-sm mt-2">{slugError.message}</p>
      )}

      {slug?.length > 0 && !slugError && isSlugManuallyEdited && (
        <>
          {isSlugChecking ? (
            <p className="text-muted-foreground text-sm mt-2">
              Checking slug availability...
            </p>
          ) : slugAvailable === true ? (
            <p className="text-green-500 text-sm mt-2">
              This slug is available
            </p>
          ) : (
            <p className="text-red-500 text-sm mt-2">
              You already have a component with this slug
            </p>
          )}
        </>
      )}

      {showOptionalFields && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor={descriptionId}>
              Description <span className="text-destructive">*</span>
            </Label>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <Textarea
                  id={descriptionId}
                  placeholder="Add some description to help others discover your component"
                  className="min-h-[none] resize-none"
                  rows={defaultRows}
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    handleTextareaInput(e)
                  }}
                  ref={(e) => {
                    if (e) {
                      const style = window.getComputedStyle(e)
                      const lineHeight = parseInt(style.lineHeight)
                      const borderHeight =
                        parseInt(style.borderTopWidth) +
                        parseInt(style.borderBottomWidth)
                      const paddingHeight =
                        parseInt(style.paddingTop) +
                        parseInt(style.paddingBottom)
                      const initialHeight =
                        lineHeight * defaultRows + borderHeight + paddingHeight
                      e.style.height = `${initialHeight}px`
                    }
                  }}
                />
              )}
            />
            <p
              className="text-xs text-muted-foreground"
              role="region"
              aria-live="polite"
            >
              A brief description of what your component does
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={registryId}>
                Component type <span className="text-destructive">*</span>
              </Label>
              <FormField
                control={form.control}
                name="registry"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger
                      id={registryId}
                      className="[&_[data-desc]]:hidden"
                    >
                      <SelectValue placeholder="Select component type" />
                    </SelectTrigger>
                    <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                      <SelectItem value="ui">
                        UI Component
                        <span
                          className="mt-1 block text-xs text-muted-foreground"
                          data-desc
                        >
                          Reusable interface elements like buttons, inputs, and
                          cards
                        </span>
                      </SelectItem>
                      <SelectItem value="hooks">
                        Hook
                        <span
                          className="mt-1 block text-xs text-muted-foreground"
                          data-desc
                        >
                          Custom React hooks for state and logic management
                        </span>
                      </SelectItem>
                      <SelectItem value="blocks">
                        Block
                        <span
                          className="mt-1 block text-xs text-muted-foreground"
                          data-desc
                        >
                          Larger sections like Hero, Features, or Testimonials
                        </span>
                      </SelectItem>
                      <SelectItem value="icons">
                        Icon
                        <span
                          className="mt-1 block text-xs text-muted-foreground"
                          data-desc
                        >
                          Custom icon components and icon sets
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <p
                className="text-xs text-muted-foreground"
                role="region"
                aria-live="polite"
              >
                The category your component belongs to
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={licenseId}>
                License <span className="text-destructive">*</span>
              </Label>
              <FormField
                control={form.control}
                name="license"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger id={licenseId}>
                      <SelectValue placeholder="Select a license" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(licenses).map(([key, license]) => (
                        <SelectItem key={key} value={license.value}>
                          {license.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <p
                className="text-xs text-muted-foreground"
                role="region"
                aria-live="polite"
              >
                Choose how others can use your component
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={websiteId}>Website URL</Label>
            <div className="relative">
              <Input
                type="text"
                id={websiteId}
                value={
                  field.value?.replace(/^(https?:\/\/)+(www\.)?/, "") || ""
                }
                onChange={(e) => field.onChange(e)}
                placeholder="your-website.com"
                className="w-full peer ps-16"
              />
              <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                https://
              </span>
            </div>
            {form.formState.errors.website_url ? (
              <p
                className="text-xs text-destructive"
                role="region"
                aria-live="polite"
              >
                {form.formState.errors.website_url.message}
              </p>
            ) : (
              <p
                className="text-xs text-muted-foreground"
                role="region"
                aria-live="polite"
              >
                Link to your component's documentation or demo
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
