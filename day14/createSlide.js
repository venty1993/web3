function createSlide(slider, slideSpeed, viewContentsCount, flexGap) {


    let index = 0 + viewContentsCount;
    let moveCheck = true;
    const gap = viewContentsCount === 1 ? 0 : flexGap;
    const contents = [];


    slider.style.position = 'relative';
    for (let i = 0; i < slider.childElementCount; i++) {
        contents[i] = slider.children[i];
        contents[i].classList.add('content');
    }
    // const sliderView = makeNode('div', 'slider-view');
    const sliderView = document.createElement('div');
    sliderView.classList.add('slider-view');

    const contentsWrapper = makeNode('div', 'contents-wrapper');
    const buttons = makeNode('div', 'buttons');
    const slidePrev = makeNode('button', 'slide-prev');
    const slideNext = makeNode('button', 'slide-next');
    slidePrev.addEventListener('click', () => {
        if (moveCheck) {
            moveCheck = false;

            index--;

            위치적용(slideSpeed);
            setTimeout(() => {
                if (index < viewContentsCount) {
                    index = contents.length + viewContentsCount - 1;
                    위치적용(0);
                }
                moveCheck = true;
            }, slideSpeed);
        }


    })

    slideNext.addEventListener('click', () => {
        if (moveCheck) {
            moveCheck = false;
            index++;
            위치적용(slideSpeed);
            setTimeout(() => {
                if (index > contents.length + viewContentsCount - 1) {
                    index = viewContentsCount;
                    위치적용(0)
                }
                moveCheck = true;
            }, slideSpeed);
        }
    })

    slider.appendChild(sliderView);
    sliderView.appendChild(contentsWrapper);

    for (let i = 0; i < contents.length; i++) {
        contentsWrapper.appendChild(contents[i]);
    }

    slider.appendChild(buttons);
    buttons.appendChild(slidePrev);
    buttons.appendChild(slideNext);
    slidePrev.innerText = "이전";
    slideNext.innerText = "다음";

    const dotButtons = makeNode('div', 'dot-buttons');

    //닷 버튼들 추가하기.
    for (let i = 0; i < contents.length; i++) {
        //4번 만들어서 각각 넣어야하기때문에 const dot 선언은 반복문 내부에서 해야한다.
        const dot = makeNode('div', 'dot');
        dotButtons.appendChild(dot);

        dot.addEventListener('click', () => {
            index = i + viewContentsCount;
            위치적용(slideSpeed);
        })
    }
    slider.appendChild(dotButtons);
    const sliderWidth = slider.clientWidth;
    const sliderHeight = slider.clientHeight;

    const contentWidth = (sliderWidth / viewContentsCount) - gap * (viewContentsCount - 1) / viewContentsCount;

    console.log(sliderWidth, sliderHeight)

    for (let i = 0; i < contentsWrapper.childElementCount; i++) {
        contentsWrapper.children[i].style.width = `${contentWidth}px`
        contentsWrapper.children[i].style.height = `${sliderHeight}px`
    }
    contentsWrapper.style.gap = `${gap}px`

    for (let i = contents.length - 1; i > contents.length - 1 - viewContentsCount; i--) {
        const cloneBack = contents[i].cloneNode(true);
        contentsWrapper.insertBefore(cloneBack, contentsWrapper.firstElementChild);
    }

    for (let i = 0; i < viewContentsCount; i++) {
        const clonePront = contents[i].cloneNode(true);
        contentsWrapper.appendChild(clonePront);
    }


    위치적용();





    function makeNode(tagName, className) {
        const node = document.createElement(tagName);
        node.classList.add(className);

        return node;
    }

    function 위치적용(time) {

        //원래는 0~3까지
        //앞뒤로 1개가 늘어나면서 총 인덱스는 0~5까지가 되었고
        //실제 슬라이더의 인덱스는 1~4까지가 되었다.

        //dotButtons[4] 는 0~3까지의 범위를 가진다.
        //index : 5
        //viewCount : 1
        //index-viewCount = 4
        for (let i = 0; i < dotButtons.childElementCount; i++) {
            dotButtons.children[i].classList.remove('active');
        }
        if (index < viewContentsCount) {
            dotButtons.lastElementChild.classList.add('active');

        } else if (index > contents.length + viewContentsCount - 1) {
            dotButtons.firstElementChild.classList.add('active');
        }
        else {
            dotButtons.children[index - viewContentsCount].classList.add('active');
        }

        contentsWrapper.style.transform = `translateX(-${index * (contentWidth + gap)}px)`
        contentsWrapper.style.transition = `${time}ms`;
        console.log(time);
    }

}





