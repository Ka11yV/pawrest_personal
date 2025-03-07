const rewardFormatting = (reward: number): number => {
    if (reward % 10000 !== 0) {
        throw new Error('사례금은 만 단위로 입력 해 주세요')
    }
    
    return reward;
};

const testContact = (phoneNumber: string): boolean => {
    const phoneNumberRegex = /^010-\d{4}-\d{4}$/;
    
    if (!phoneNumberRegex.test(phoneNumber)) {
        throw new Error('전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)');
    }

    return true;
};



export { rewardFormatting, testContact };
