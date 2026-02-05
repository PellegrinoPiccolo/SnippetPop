export const COLORS: Record<string, string> = {
    'red': '#EF4444',
    'blue': '#3B82F6',
    'green': '#10B981',
    'yellow': '#F59E0B',
    'purple': '#8B5CF6',
    'pink': '#EC4899',
    'gray': '#6B7280',
    'indigo': '#6366F1',
    'teal': '#14B8A6',
    'orange': '#F97316',
};

export const AVAILABLE_COLORS = Object.keys(COLORS);

export const getColorHex = (colorName: string): string => {
    return COLORS[colorName] || '#6B7280';
}