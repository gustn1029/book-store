import { Button } from "@nextui-org/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    
    const getPageRange = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
  
      let left = currentPage - delta;
      let right = currentPage + delta;
  
      if (left < 1) left = 1;
      if (right > totalPages) right = totalPages;
  
      for (let i = left; i <= right; i++) {
        range.push(i);
      }
  
      if (left > 1) {
        rangeWithDots.push(1);
        if (left > 2) rangeWithDots.push('...');
      }
  
      rangeWithDots.push(...range);
  
      if (right < totalPages) {
        if (right < totalPages - 1) rangeWithDots.push('...');
        rangeWithDots.push(totalPages);
      }
  
      return rangeWithDots;
    };
  
    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <Button
          onPress={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          size="sm"
          variant="bordered"
        >
          이전
        </Button>
  
        {getPageRange().map((page, index) => (
          <Button
            key={index}
            onPress={() => typeof page === 'number' ? onPageChange(page) : undefined}
            size="sm"
            variant={page === currentPage ? "solid" : "bordered"}
            color={page === currentPage ? "primary" : "default"}
          >
            {page}
          </Button>
        ))}
  
        <Button
          onPress={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          size="sm"
          variant="bordered"
        >
          다음
        </Button>
      </div>
    );
  };
  
  export default Pagination;