const ReviewForm: React.FC = () => {
  return (
    <form className="space-y-4 text-start">
      <div className="text-gray-600">أضف تعليقك</div>
      <textarea
        className="w-full border border-gray-300 p-2 rounded-md text-sm"
        rows={4}
        placeholder="يرجى إضافة تعليقك .."
      ></textarea>
      <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600">
        نشر تعليقك
      </button>
    </form>
  );
};

export default ReviewForm;
