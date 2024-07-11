export const checkCompletedType = lessonIds => {
  if (
    typeof lessonIds === 'object' &&
    lessonIds !== null &&
    !Array.isArray(lessonIds)
  ) {
    // Convert the object into an array
    const arrayFromObject = Object.entries(lessonIds).map(([key, value]) => {
      return value;
    });
    return arrayFromObject;
  } else if (Array.isArray(lessonIds)) {
    return lessonIds;
  }
};
