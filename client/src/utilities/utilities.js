export const backToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
}

export const scrollToSectionStart = (id) =>
    () => setTimeout(() =>
        document.getElementById(id)
            .scrollIntoView({ block: "start" }));
