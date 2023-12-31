gsap.registerPlugin(ScrollTrigger);

const articles = document.querySelector(".comentarios__content");

function getScrollAmount() {
  let articlesWidth = articles.scrollWidth;
  return -(articlesWidth - window.innerWidth);
}

const tween = gsap.to(articles, {
  x: getScrollAmount,
	duration: 3,
	ease: "none"
});

ScrollTrigger.create({
  trigger:".comentarios",
  start:"top 0%",
  end: () => `+=${getScrollAmount() * -1}`,
  pin:true,
  animation:tween,
  scrub:1,
  // markers:true
});