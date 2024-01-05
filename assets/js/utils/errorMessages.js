export function getPolishErrorMessage(error) {
    const errorMessages = {
        'Invalid date. Date should be between 2023-01-01 and today.': 'Błędne dane. Data powinna przypadać pomiędzy 2023-01-01 a dniem dzisiejszym.',
        'Invalid date format. Expected format is YYYY-MM-DD.': 'Zły format danych. Data powinna być w formacie RRRR-MM-DD.',
        'Bad Request: The request was improperly formulated or exceeded the data limit.': 'Żądanie zostało błędnie sformułowane lub przekroczono limit danych. Spróbuj ponownie później.',
        'Not Found': 'Nie znaleziono zasobu. Sprawdź poprawność adresu URL i spróbuj ponownie.',
    };

    const defaultMessage = 'Wystąpił nieoczekiwany błąd serwera. Jeżeli problem się powtórzy, prosimy o kontakt mailowy podany w stopce.';

    return errorMessages[error] || defaultMessage;
}