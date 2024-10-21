function showVideo() {
    // 비디오 모달을 보여줍니다.
    document.getElementById('videoModal').style.display = 'flex';
}

function closeVideoModal() {
    // 비디오 재생을 멈추고 모달을 닫습니다.
    var video = document.getElementById('project1Video');
    video.pause();
    document.getElementById('videoModal').style.display = 'none';
}


function showVideo2() {
    // 비디오 모달을 보여줍니다.
    document.getElementById('videoModal2').style.display = 'flex';
}

function closeVideoModal2() {
    // 비디오 재생을 멈추고 모달을 닫습니다.
    var video = document.getElementById('project2Video');
    video.pause();
    document.getElementById('videoModal2').style.display = 'none';
}




function openVideo2() {
    // 여기에 동영상 파일 또는 유튜브 링크를 추가합니다.
    window.open('https://your-video-url.com', '_blank');
    // '_blank'는 새 창에서 링크를 열기 위한 속성입니다.
}

// About 페이지에서 빈 페이지와 homeIntro.html을 로드하는 함수
function loadResume() {
    showSection('about');  // about 섹션을 표시

    // 빈 페이지 HTML을 먼저 추가
    const aboutContent = document.getElementById('about-content');
    aboutContent.innerHTML = `
    

    <div style="display: flex; justify-content: center; align-items: center; height: 80vh;">
        <div style="height: 400px; width: 80%; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #f0f0f0; border: 2px solid navy; border-radius: 25px; margin-bottom: 20px; padding: 20px;">
            <h1>自己紹介</h1>
            <br> <!-- 줄바꿈을 추가합니다 -->
            <p style="text-align: left;">
                私は経済学を専攻した志願者シム·ジェホです。 大学3年生の時、父と一緒に創業をして土木装備貿易仲介業務を経験しました。 卒業後はコンサルティング企業に就職して、データ分析および報告書作成業務を進めました。 最近では、seigakushaの研修プログラムにも参加してプログラミング言語を主に学習するとか、実際のプロジェクトにも参加しました。
                チームメンバーおよび全体プロジェクトを管理する役割を主に果たし、代表者としてチームスケジュールとチーム進行状況の中間報告および結果物の最終報告など日程管理と報告業務も引き受けて処理しました。
                また、個人プロジェクトを進めて、実際のプロジェクトを企画して進める時の内容を1ヶ所にまとめてみました。 プロジェクト2を対象に考えの流れのまま全ての内容をメモするように記録しました。 実際にプロジェクトを進める際に改善されたり追加されるべき部分を確認し、理解できたかどうかを自ら点検するきっかけになりました。 これから貴社でプロジェクトを進行するにあたっても全体の流れを整理して現進行状況と現在一番優先視されるべき部分、必ず考慮されなければならない部分を多角的に考えながら進行する姿勢を持たなければならないと思いました。
                <br><br>
                希望勤務地:&nbsp;札幌<br>
                希望職種:&nbsp;ウェブ(開発)ディレクター、バックエンドエンジニア<br>           
            </p>
        </div>
    </div>
    `;
    

    // homeIntro.html 파일을 불러와서 추가
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'homeIntro.html', true);  // homeIntro.html 파일을 비동기적으로 로드
    xhr.onload = function () {
        if (this.status === 200) {
            aboutContent.innerHTML += this.responseText;  // 빈 페이지 아래에 homeIntro.html의 내용 추가
        }
    };
    xhr.send();
}


function showSection(sectionId) {
    // 모든 섹션 숨기기
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // 선택한 섹션 보이기
    document.getElementById(sectionId).style.display = 'block';

    // 홈 화면 또는 URL 해시값이 없을 때 前に 버튼 숨기기
    // if (sectionId === 'home' || window.location.hash === '' || window.location.hash === '#') {
    //     document.getElementById('prevBtn').style.display = 'none';
    // } else {
    //     document.getElementById('prevBtn').style.display = 'inline-block';
    // }

    // 홈 화면일 때 前に 버튼 숨기기
    if (sectionId === 'home') {
        document.getElementById('prevBtn').style.display = 'none';
    } else {
        document.getElementById('prevBtn').style.display = 'inline-block';
    }

    // Inquiry 화면일 때 次に 버튼 숨기기
    if (sectionId === 'Inquiry') {
        document.getElementById('nextBtn').style.display = 'none';
    } else {
        document.getElementById('nextBtn').style.display = 'inline-block';
    }

    // About 섹션일 때 이미지 동적 추가
    //  if (sectionId === 'about') {
    //      const imageContainer = document.getElementById('imageContainer');
    //      imageContainer.innerHTML = `
    //         <div class="centered-images">
    //             <img src="resume1.png" alt="Resume Image 1" class="doc-image">
    //             <img src="resume2.png" alt="Resume Image 2" class="doc-image">
    //             <img src="resume3.png" alt="Resume Image 3" class="doc-image">
    //             <img src="resume4.png" alt="Resume Image 4" class="doc-image">
    //         </div>
    //      `;
    //  }



    





    // Project1 또는 Project2가 선택되었을 때만 해당 네비게이션 바 표시
    if (sectionId.startsWith('project1')) {
        document.getElementById('project1-navbar').style.display = 'flex';
        document.getElementById('project2-navbar').style.display = 'none';
    } else if (sectionId.startsWith('project2')) {
        document.getElementById('project2-navbar').style.display = 'flex';
        document.getElementById('project1-navbar').style.display = 'none';
    } else {
        document.getElementById('project1-navbar').style.display = 'none';
        document.getElementById('project2-navbar').style.display = 'none';
    }
}


// 페이지 로드 시 URL의 해시를 확인하고 기본 섹션 설정
window.onload = function() {
    const hash = window.location.hash.substring(1);  // 해시에서 # 제거
    if (hash) {
        showSection(hash);
    } else {
        showSection('home');  // 해시가 없으면 home 섹션 표시
    }
};



// 새로운 창 열기 함수
function openNewTab1() {
    window.open('http://57.180.41.44:8003/Top_Page.html', '_blank');
}
function openNewTab2() {
    window.open('https://koca.sekoaischool.com/pro2_front/kobetop.html', '_blank');
}

// 페이지 로드 시 기본 섹션 설정
window.onload = function() {
    showSection('home');
};


// 각 섹션의 순서 정의
// const sectionsOrder = ['home', 'about', 'schedule', 'project1', 'project2', 'Inquiry'];
// const sectionsOrder = ['home', 'project1', 'project1-overview', 'project1-plan', 'project1-design', 'project1-api', 'project2', 'project2-overview', 'project2-plan', 'project2-api', 'Inquiry'];
// const sectionsOrder = [
//     'home', 'about', 'schedule',
//     'project1_plan', 'project1_design', 'project1_result', 'project1_api', 'project1_schedule',
//     'project2_plandesign', 'project2_result', 'project2_api', 'project2_schedule',
//     'Inquiry'
// ];

// 현재 섹션을 추적하는 변수
// let currentSectionIndex = 0;


// 섹션 이동 함수
// function navigateToSection(direction) {
//     if (direction === 'prev') {
//         currentSectionIndex = (currentSectionIndex - 1 + sectionsOrder.length) % sectionsOrder.length;
//     } else if (direction === 'next') {
//         currentSectionIndex = (currentSectionIndex + 1) % sectionsOrder.length;
//     }
//     showSection(sectionsOrder[currentSectionIndex]);
// }

// 섹션 이동 함수
function navigateToSection(direction) {
    const sectionsOrder = ['home', 'about', 'project1', 'project1-overview', 'project1-plan', 'project1-design', 'project1-api', 'project1-schedule', 'project2', 'project2-overview', 'project2-plan', 'project2-api', 'project2-schedule', 'Inquiry'];
    let currentSectionIndex = sectionsOrder.indexOf(document.querySelector('.section[style="display: block;"]').id);

    if (direction === 'prev') {
        currentSectionIndex = (currentSectionIndex - 1 + sectionsOrder.length) % sectionsOrder.length;
    } else if (direction === 'next') {
        currentSectionIndex = (currentSectionIndex + 1) % sectionsOrder.length;
    }
    showSection(sectionsOrder[currentSectionIndex]);
}


// function showSection(section) {
//     // 모든 섹션 숨기기
//     document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    
//     // 선택한 섹션만 표시
//     document.getElementById(section).style.display = 'block';
    
//     // About 섹션일 때 이미지 동적 추가
//     if (section === 'about') {
//         const imageContainer = document.getElementById('imageContainer');
//         imageContainer.innerHTML = `
//             <img src="resume1.png" alt="Resume Image 1" class="doc-image">
//             <img src="resume2.png" alt="Resume Image 2" class="doc-image">
//             <img src="resume3.png" alt="Resume Image 3" class="doc-image">
//             <img src="resume4.png" alt="Resume Image 4" class="doc-image">
//         `;
//     }

//     // 내비게이션 버튼 상태 업데이트
//     updateNavButtons();
// }


// PDF 파일을 표시하는 함수
function showPDF(fileName) {
    // 모든 PDF 뷰어를 숨깁니다.
    document.querySelectorAll('.pdf-viewer').forEach(viewer => {
        viewer.style.display = 'none';  // 모든 PDF 뷰어 숨김
    });

    // 해당하는 PDF만 표시
    const pdfViewer = document.getElementById('pdfViewer-project2');
    pdfViewer.src = fileName;  // PDF 파일 설정
    pdfViewer.style.display = 'block';  // 해당 PDF 뷰어를 표시
}



// HTML 파일 표시 함수 (독립적으로 처리)
function showHTML(fileName) {
    // 현재 활성화된 섹션 확인
    const activeSection = document.querySelector('.section:not([style*="display: none"])');
    
    // 현재 활성화된 섹션에서 `html-viewer`를 찾기
    const htmlViewer = activeSection.querySelector('.html-viewer');
    
    // 해당 섹션의 `htmlViewer`가 존재할 경우에만 설정
    if (htmlViewer) {
        htmlViewer.src = fileName;
        htmlViewer.style.display = 'block';
    }

    // 다른 Viewer 숨기기
    document.querySelectorAll('.pdf-viewer, .excel-viewer').forEach(viewer => {
        viewer.style.display = 'none';
    });
}


// Excel 파일을 표시하는 함수
function showExcel(fileUrl) {
    // 모든 Excel 뷰어를 숨깁니다.
    document.querySelectorAll('.excel-viewer').forEach(viewer => {
        viewer.style.display = 'none';  // 모든 Excel 뷰어 숨김
    });

    // 해당하는 Excel만 표시
    const excelViewer = document.getElementById('excelViewer-project2');
    excelViewer.src = fileUrl;  // Excel 파일 설정
    excelViewer.style.display = 'block';  // 해당 Excel 뷰어를 표시
}

// 이전/다음 버튼 표시 여부 결정
function updateNavButtons() {
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');

    if (currentSectionIndex === 0) {
        prevButton.style.display = 'none'; // Home에서 前に 버튼 숨김
    } else {
        prevButton.style.display = 'inline-block';
    }

    if (currentSectionIndex === sectionsOrder.length - 1) {
        nextButton.style.display = 'none'; // Inquiry에서 次に 버튼 숨김
    } else {
        nextButton.style.display = 'inline-block';
    }
}

// 상단으로 스크롤 이동 함수
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // 페이지의 가장 상단 위치인 0으로 설정, Y축의 좌표가 0인 위치로 스크롤을 이동
}

// 스크롤 이벤트 감지하여 Topへ 버튼 표시 여부 결정
window.onscroll = function () {
    const topButton = document.getElementById('topBtn');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    // 사용자가 페이지를 스크롤하여 200픽셀 이상 내려갔는지 확인
    // 스크롤이 200픽셀 이상 내려간 경우, "Topへ" 버튼을 표시
        topButton.style.display = 'block';
        // "Topへ" 버튼의 display 속성을 'block'으로 설정하여 버튼을 화면에 표시
    } else {
        topButton.style.display = 'none';
        // display 속성을 'none'으로 설정하여 버튼이 화면에서 보이지 않게 지정
    }
};



// 이미지 설명 데이터 (예시)
const imageDescriptions = {
    "a1.jpg": ""
};



// let scale = 1; // 현재 이미지 확대 비율
// let translateX = 0;
// let translateY = 0;

// // 모달 창 열기 함수
// function openModal(imageElement) {
//     const modal = document.getElementById('imageModal');
//     const modalImage = document.getElementById('modalImage');
//     modalImage.src = imageElement.src;
//     modal.style.display = 'flex';
//     resetImageTransform(); // 초기화
// }

// // 이미지 확대 함수
// function zoomIn() {
//     const modalImage = document.getElementById('modalImage');
//     scale += 0.2; // 확대 비율 증가
//     updateImageTransform(modalImage);
// }

// // 이미지 축소 함수
// function zoomOut() {
//     const modalImage = document.getElementById('modalImage');
//     if (scale > 0.4) { // 최소 축소 비율 설정
//         scale -= 0.2; // 축소 비율 감소
//         updateImageTransform(modalImage);
//     }
// }

// // 이미지의 확대/축소 및 위치를 업데이트하는 함수
// function updateImageTransform(image) {
//     image.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
// }

// // 모달 창 닫기 함수
// function closeModal() {
//     const modal = document.getElementById('imageModal');
//     modal.style.display = 'none';
//     resetImageTransform(); // 초기화
// }

// // 이미지 확대/축소 및 위치 초기화 함수
// function resetImageTransform() {
//     scale = 1;
//     translateX = 0;
//     translateY = 0;
//     const modalImage = document.getElementById('modalImage');
//     modalImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
// }






    // let scale = 1; // 이미지 확대 비율 초기값

    // // 모달 창 열기 함수
    // function openModal(imageElement) {
    //     const modal = document.getElementById('imageModal');
    //     const modalImage = document.getElementById('modalImage');
    //     modalImage.src = imageElement.src;
    //     modalImage.style.width = "100%";
    //     scale = 1; // 확대 비율 초기화
    //     modal.style.display = 'flex';
    // }

    // // 모달 창 닫기 함수
    // function closeModal() {
    //     const modal = document.getElementById('imageModal');
    //     modal.style.display = 'none';
    // }

    // // 이미지 확대 함수
    // function zoomIn() {
    //     const modalImage = document.getElementById('modalImage');
    //     scale += 0.2; // 확대 비율 증가
    //     modalImage.style.width = `${scale * 100}%`; // 이미지의 너비 조정
    //     modalImage.style.height = 'auto'; // 높이는 비율에 따라 자동 조정
    // }

    // // 이미지 축소 함수
    // function zoomOut() {
    //     const modalImage = document.getElementById('modalImage');
    //     if (scale > 0.4) { // 최소 축소 비율 설정
    //         scale -= 0.2; // 축소 비율 감소
    //         modalImage.style.width = `${scale * 100}%`; // 이미지의 너비 조정
    //         modalImage.style.height = 'auto'; // 높이는 비율에 따라 자동 조정
    //     }
    // }


    // 이미지 배열
    const project2Images = [
        'Project2image1.png',
        'Project2image2.png',
        'Project2image3.png',
        'Project2image4.png',
        'Project2image5.png',
        'Project2image6.png',
        'Project2image7.png',
        'Project2image8.png'
    ];

    // 현재 이미지 인덱스 추적
    let currentIndex = 0;





    let scale = 1; // 이미지 확대 비율 초기값
    let isDragging = false; // 드래그 상태를 추적하는 변수
    let startX, startY; // 마우스의 시작 좌표
    let translateX = 0, translateY = 0; // 이미지 이동 좌표
    
    // 모달 창 열기 함수
    function openModal(imageElement) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');

        // 현재 이미지의 파일명 추출
        const imageSrc = imageElement.src.split('/').pop();
        
        modalImage.src = imageElement.src;
        scale = 1; // 확대 비율 초기화
        translateX = 0;
        translateY = 0;
        modalImage.style.transform = `translate(0, 0) scale(${scale})`; // 초기 위치 및 확대 설정
        modal.style.display = 'flex';
    
        // project2Images에 포함된 이미지들만 이전/다음 버튼을 표시
        if (project2Images.includes(imageSrc)) {
            document.querySelector('.prev-btn').style.display = 'block';
            document.querySelector('.next-btn').style.display = 'block';
            addImageDrag(modalImage); // 드래그 기능 추가
        } else {
            document.querySelector('.prev-btn').style.display = 'none';
            document.querySelector('.next-btn').style.display = 'none';
            removeImageDrag(modalImage); // 드래그 기능 제거
        }
    }

    // 이전 이미지로 이동
    function prevImage() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : project2Images.length - 1;
        updateModalImage();
    }

    // 다음 이미지로 이동
    function nextImage() {
        currentIndex = (currentIndex < project2Images.length - 1) ? currentIndex + 1 : 0;
        updateModalImage();
    }

    // 모달 이미지 업데이트 함수
    function updateModalImage() {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = project2Images[currentIndex];
    }




    
    // 이미지 드래그 이동 기능 설정 함수
    function addImageDrag(modalImage) {
        modalImage.style.cursor = 'grab'; // 손바닥 모양 커서 설정
    
        // 마우스 클릭 시 드래그 시작
        modalImage.addEventListener('mousedown', (e) => {
            isDragging = true;
            modalImage.style.cursor = 'grabbing'; // 드래그 중 커서 변경
            startX = e.clientX; // 클릭 시점의 X 좌표
            startY = e.clientY; // 클릭 시점의 Y 좌표
        });
    
        // 마우스 이동 시 이미지 드래그
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return; // 드래그 중이 아니면 함수 종료
            e.preventDefault(); // 기본 동작 방지
    
            // 이동 거리 계산
            const diffX = e.clientX - startX;
            const diffY = e.clientY - startY;
    
            // 이동 좌표 업데이트
            translateX += diffX;
            translateY += diffY;
    
            // 이미지의 위치 조정
            modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    
            // 현재 마우스 위치를 기준으로 다시 설정
            startX = e.clientX;
            startY = e.clientY;
        });
    
        // 마우스 클릭 해제 시 드래그 종료
        document.addEventListener('mouseup', () => {
            isDragging = false;
            modalImage.style.cursor = 'grab'; // 손바닥 모양 커서로 변경
        });
    }
    
    // 모달 닫기 함수
    function closeModal() {
        const modal = document.getElementById('imageModal');
        modal.style.display = 'none'; // 모달의 display 속성을 none으로 설정
    }
    
    // 이미지 확대 함수
    function zoomIn() {
        const modalImage = document.getElementById('modalImage');
        scale += 0.2; // 확대 비율 증가
        modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    
    // 이미지 축소 함수
    function zoomOut() {
        const modalImage = document.getElementById('modalImage');
        if (scale > 0.4) { // 최소 축소 비율 설정
            scale -= 0.2; // 축소 비율 감소
            modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        }
    }