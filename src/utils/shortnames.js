
export const shortenName = (Name) => Name.length <= 18 ? Name : Name.split("").slice(0, 12).join("") + "...";