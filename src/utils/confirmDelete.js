import Swal from "sweetalert2";

export const confirmDelete = async ({
  id,
  token,
  dispatch,
  deleteAction,
  navigate,
  successRedirectTo = "/",
}) => {
  const isSoftDelete = deleteAction.name.includes("soft");

  const result = await Swal.fire({
    title: "Are you sure?",
    text: isSoftDelete
      ? "This will soft delete the property. It can be recovered from backend."
      : "This will permanently delete the property. You cannot undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await dispatch(deleteAction({ id, token }));
      Swal.fire({
        title: "Deleted!",
        text: isSoftDelete
          ? "Soft deleted successfully."
          : "Hard deleted permanently.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(successRedirectTo);
    } catch (error) {
      Swal.fire("Error", "Failed to delete the item", "error");
    }
  } else {
    Swal.fire("Cancelled", "Delete operation cancelled", "info");
  }
};
