export interface CheckboxProps {
    label?: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
};

export interface ButtonProps {
    content: string | React.ReactNode;
    onClick?: () => void;
    backgroundColor?: string;
    type?: "submit";
    width?: string | number;
    height?: string | number;
};

export interface CardProps {
    userSkill: UserSkill;
    deleteSkill: (userId: string) => void;
    refreshSkills: () => void;
};

export interface CardModalProps {
    skill: Skill;
    onChange: () => void;
};

export interface DeleteModalProps {
    isVisibleModal: boolean;
    onCancel: () => void;
    onDelete: () => void;
};

export interface HeaderProps {
    setIsModalOpen: (value: boolean) => void;
};

export interface IconProps {
    name: string;
    className?: string;
    color?: string;
    size?: number;
    onClick?: () => void;
};

export interface InputProps {
    label: string;
    type: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
    id?: string;
    hasIcon?: boolean;
};

export interface ModalProps {
    isVisibleModal: boolean;
    onCancel: () => void;
    onSave: () => void;
    userSkills: UserSkill[];
};

export interface StarRatingProps {
    rating: number;
    onRatingChange: (newRating: number) => void;
    isEditing: boolean;
    onSave: () => void;
};

export interface AuthUserContextProps {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

export interface RegisterUserContextProps {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

export interface PrivateProps {
    children: JSX.Element;
};

export interface IUserCredentials {
    username: string;
    password: string;
};

export interface Skill {
    skillId: string;
    skillName: string;
    description: string;
    image: string;
    checked?: boolean;
};

export interface UserSkillRequest {
    skillId: string;
    userId: string;
}

export interface UserSkill {
    userSkillId: string;
    skill: Skill;
    level?: number;
};

export interface UserSkillResponse {
    userId: string;
    username?: string;
    userSkills: UserSkill[];
};

export interface UpdateUserSkill {
    userSkillId: string;
    level: number;
};

export interface UpdateUserSkillLevelResponse {
    success: boolean;
    message: string;
}

export interface SkillModel {
    skillId: string;
    skillName: string;
    description: string;
    image: string;
}

export interface Page<T> {
    content: T[];
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

export type PageSkillModel = Page<SkillModel>;
export type PageUserSkill = Page<UserSkill>;
