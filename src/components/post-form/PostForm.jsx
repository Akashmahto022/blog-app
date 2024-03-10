import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteServices from "../../appwrite/services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const submit = async (data) => {
    console.log("handle submit click");
    if (post) {
      const file = data.image[0]
        ? await appwriteServices.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteServices.deletefile(post.featuredImage);
      }
      const dbPost = await appwriteServices.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteServices.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteServices.createPost({
          ...data,
          userId: userData.$id
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransForm = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransForm(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransForm, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flrx flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug"
          placeholder="slug"
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransForm(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="Content"
          control={control}
          defaultValues={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2 py-4">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post,
          })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteServices.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
