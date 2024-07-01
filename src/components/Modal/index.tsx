import React, { useEffect } from 'react';

interface Pagination {
  last: number;
  current: number;
  gotoPage: (page: number) => void;
}

interface Props {
  closeModal: () => void;
  searchResults: any[];
  pagination: Pagination;
  selectedPlace: (place: any) => void;
}

const Modal: React.FC<Props> = ({ closeModal, searchResults, pagination, selectedPlace }) => {
  
  const handleSelectPlace = (place: any) => {
    // 선택된 장소 정보를 부모 컴포넌트로 전달
    selectedPlace(place);
    closeModal(); // 모달을 닫습니다
  };

  const displayPagination = () => {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;

    const fragment = document.createDocumentFragment();

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild!);
    }

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i.toString();

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = () => {
          pagination.gotoPage(i);
            // 페이지를 변경할 때 스크롤을 맨 위로 올립니다
            console.log("ss")
          window.scroll(0, 0);
        };
      }

      fragment.appendChild(el);

      if (i < pagination.last) {
        const space = document.createElement('span');
        space.innerHTML = ' '; // 간격을 넣고 싶은 만큼의 공백을 추가합니다
        fragment.appendChild(space);
      }
    }
    paginationEl.appendChild(fragment);
  };

  const getLocationInfo = (result: any) => {
    console.log(result);
  }

  // 모달이 열릴 때 페이지네이션을 초기화합니다
  useEffect(() => {
    displayPagination();
  }, [pagination]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 relative" style={{ width: '300px', height: '500px', maxHeight: '100%', overflowY: 'auto' }}>
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">검색 결과</h2>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index} className="mb-2">
              <button onClick={() => handleSelectPlace(result)}>
                <p className="font-semibold">{result.place_name}</p>
                <p className="text-sm text-gray-500">{result.address_name}</p>
              </button>
            </li>
          ))}
        </ul>
        {/* Pagination 표시할 영역 */}
        <div id="pagination" className="mt-4"></div>
      </div>
    </div>
  );
};

export default Modal;
