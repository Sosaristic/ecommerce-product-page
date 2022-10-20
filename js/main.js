const lightBoxCloseBtn = document.querySelector(".close-icon");
const lightBoxContainer = document.querySelector(".light-box-container");
const imageSliderContainer = document.querySelector(".main-image");
const cartIcon = document.querySelector(".cart");
const cartContainer = document.querySelector(".cart-container");
const slideImagesContainer = document.getElementsByClassName("slide");
const lightBoxSlide = document.getElementsByClassName("light-box-main-image");
const nextButton = document.querySelector(".next");
const lightNextButton = document.querySelector(".light-box-next");

const prevButton = document.querySelector(".prev");
const lightPrevtButton = document.querySelector(".light-box-previous");
const thumbnails = document.querySelectorAll(".thumbnail");
const lightThumbnail = document.querySelectorAll(".light-thumbnail");
const addToCartBtn = document.querySelector(".add-cart");
const reduceBtn = document.querySelector(".minus");
const increaseBtn = document.querySelector(".plus");
const numberOfItems = document.querySelector(".number");
const itemTitle = document.querySelector(".product h1").textContent;
const cartCardContainer = document.querySelector(".cartcard-container");
const checkoutBtn = document.querySelector(".checkout-btn");
const totalCartItems = document.querySelector(".no-items");
let slideIndex = 1;

const cartItems = [];

//open light box
imageSliderContainer.addEventListener("click", () => {
  const innerWidth = window.innerWidth;
  if (innerWidth >= 820) {
    lightBoxContainer.style.display = "flex";
    lightThumbnail.forEach((item) => {
      item.classList.remove("active");
    });
    showSlides(slideIndex, lightBoxSlide);
    lightBoxCurrentSlide();
  }
});

// close light box container
lightBoxCloseBtn.addEventListener("click", () => {
  lightBoxContainer.style.display = "none";
});
//open and close cart
cartIcon.addEventListener("mouseenter", () => {
  cartContainer.style.display = "block";
});
cartIcon.addEventListener("mouseleave", () => {
  cartContainer.style.display = "none";
});

// slide show function

const showSlides = (n, slideContext) => {
  let i;
  if (n > slideImagesContainer.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slideContext.length;
  }
  for (i = 0; i < slideContext.length; i++) {
    slideContext[i].style.display = "none";
  }
  slideContext[slideIndex - 1].style.display = "flex";
  lightThumbnail[slideIndex - 1].classList.add("active");
};

showSlides(slideIndex, slideImagesContainer);
showSlides(slideIndex, lightBoxSlide);

// next / previous control
const plusSlides = (n, slideContext) => {
  showSlides((slideIndex += n), slideContext);
};
prevButton.addEventListener("click", () => {
  plusSlides(-1, slideImagesContainer);
});
lightPrevtButton.addEventListener("click", () => {
  lightThumbnail.forEach((item) => {
    item.classList.remove("active");
  });
  plusSlides(-1, lightBoxSlide);
});

nextButton.addEventListener("click", () => {
  plusSlides(1, slideImagesContainer);
});
lightNextButton.addEventListener("click", () => {
  lightThumbnail.forEach((item) => {
    item.classList.remove("active");
  });
  plusSlides(1, lightBoxSlide);
});

thumbnails[0].classList.add("active");
thumbnails.forEach((item) => {
  item.addEventListener("click", (e) => {
    const parentElement = e.target.parentElement;
    id = +e.target.parentElement.id;
    showSlides((slideIndex = id), slideImagesContainer);
    thumbnails.forEach((item) => {
      item.classList.remove("active");
    });
    parentElement.classList.add("active");
  });
});

const lightBoxCurrentSlide = () => {
  lightThumbnail.forEach((item) => {
    item.addEventListener("click", (e) => {
      const parentElement = e.target.parentElement;
      console.log(parentElement);
      id = +e.target.parentElement.id;
      showSlides((slideIndex = id), lightBoxSlide);
      lightThumbnail.forEach((item) => {
        item.classList.remove("active");
      });
      parentElement.classList.add("active");
    });
  });
};

// adding itemas to cart
increaseBtn.addEventListener("click", () => {
  const numberValue = +numberOfItems.textContent;
  numberOfItems.textContent = numberValue + 1;
  increaseCartItemQty();

});
reduceBtn.addEventListener("click", () => {
  const numberValue = +numberOfItems.textContent;
  if (numberValue > 1) {
    numberOfItems.textContent = numberValue - 1;
  }
});

const removeChildren = (parent) => {
  let child = parent.firstElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.firstElementChild;
  }
};

const cartQuantity = (itemArray) => {
  const sum = itemArray.reduce((previous, initial) => {
    const qty = +initial.qty;

    return previous + qty;
  }, 0);
  return sum;
};

const createCartContainer = (itemTitle, amount, qty, imgSrc, totalAmount) => {
  const cartCard = document.createElement("div");
  cartCard.classList.add("cart-card");
  const productImage = document.createElement("div");
  productImage.classList.add("product-image");
  const image = document.createElement("img");
  image.setAttribute("src", imgSrc);
  productImage.append(image);
  cartCard.append(productImage);

  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");
  const productTitle = document.createElement("div");
  productTitle.classList.add("title");
  productTitle.innerText = itemTitle;
  const productAmount = document.createElement("div");
  productAmount.classList.add("amount");
  productAmount.innerText = `${amount} x ${qty}`;
  const spanAmount = document.createElement("span");
  spanAmount.innerText = `$${totalAmount}.00`;
  productAmount.append(spanAmount);
  productDetails.append(productTitle);
  productDetails.append(productAmount);
  cartCard.append(productDetails);

  const removeProductIcon = document.createElement("div");
  removeProductIcon.classList.add("remove");
  const removeIcon = document.createElement("img");
  removeIcon.setAttribute("src", "./images/icon-delete.svg");
  removeProductIcon.append(removeIcon);
  cartCard.append(removeProductIcon);

  cartCardContainer.append(cartCard);
};

addToCartBtn.addEventListener("click", () => {
  const isItemExisting = cartItems.some((item) => item.itemTitle === itemTitle);
  if (!isItemExisting) {
    const qty = +numberOfItems.textContent;
    const amount = document.querySelector(".main-amount").textContent;
    const slicedAmount = +amount.slice(1, 7);

    const totalAmount = qty * slicedAmount;
    const itemObj = {
      itemTitle,
      qty,
      totalAmount,
    };

    cartItems.push(itemObj);

    removeChildren(cartCardContainer);

    cartItems.map((item) => {
      createCartContainer(
        item.itemTitle,
        amount,
        item.qty,
        "./images/image-product-1.jpg",
        item.totalAmount
      );
    });
    totalCartItems.textContent = cartQuantity(cartItems);
  }
});

const increaseCartItemQty = () => {
  const isItemExisting = cartItems.some((item) => item.itemTitle === itemTitle);
  console.log(isItemExisting);
  if (isItemExisting) {
    const newObject = cartItems.map((item) => {
      if (item.itemTitle == itemTitle) {
        return (item.qty += 1);
      }
      return item;
    });
  }
  totalCartItems.textContent = cartQuantity(cartItems);
  removeChildren(cartCardContainer);
  console.log(cartItems);
  const amount = document.querySelector(".main-amount").textContent;

  cartItems.map((item) => {
    createCartContainer(
      item.itemTitle,
      amount,
      item.qty,
      "./images/image-product-1.jpg",
      item.totalAmount
    );
  });
};
