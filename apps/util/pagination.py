from rest_framework.pagination import PageNumberPagination


class SetPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 15


class FullSetPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 400
    page_size_query_param = 'page_size'
    max_page_size = 50
