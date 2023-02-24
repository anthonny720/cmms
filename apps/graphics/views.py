import math
import random
from datetime import datetime, timedelta

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.assets.models import Physical, Fixed
from apps.config.models import Failure, Type
from apps.management.models import WorkOrder
from apps.management.serializers import WorkOrderSerializer

# Create your views here.
User = get_user_model()


def generate_color(transparency=1):
    rand_color = (random.randrange(255), random.randrange(255), random.randrange(255))
    color_full = "rgba({}, {}, {}, {})".format(rand_color[0], rand_color[1], rand_color[2], 1)
    return color_full


class GetQuantityOTPersonnel(APIView):
    def get(self, request, *args, **kwargs):
        try:
            queryset = WorkOrder.objects.filter(status=True)
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)
            count_total_ot = []
            total_hours = []
            days = []
            range_date = []

            if date_start and date_end:
                queryset = queryset.filter(date_start__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)

            users = User.objects.filter(role="Técnico")
            for q in queryset.order_by('date_start'):
                if q.date_start.date() not in range_date:
                    range_date.append(q.date_start.date())

            for u in users:
                result = []
                days_personnel = []
                query = queryset.filter(technical=u)
                result.append(query.count())

                count_total_ot.append({'label': u.get_full_name(), 'data': result, 'backgroundColor': generate_color()})

                hours = 0
                for q in query:
                    hours += q.get_time().total_seconds()
                total = str(timedelta(seconds=hours)).split('.')[0]
                hours = hours / 3600

                total_hours.append({'label': u.get_full_name() + " " + total + " hrs", 'data': hours,
                                    'backgroundColor': generate_color()})

                for d in range_date:
                    query = queryset.filter(date_start__date=d, technical=u)
                    hours = 0
                    for q in query:
                        hours += q.get_time().total_seconds()
                    hours = str(timedelta(seconds=hours))
                    days_personnel.append({'label': d, 'data': hours})
                days.append({'label': u.get_full_name(), 'data': days_personnel})

            return Response({'count_total_ot': count_total_ot, 'total_hours': total_hours, 'days': days},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetGraphicsFailure(APIView):
    def get(self, request):
        try:
            queryset = WorkOrder.objects.filter(status=True)
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)

            if date_start and date_end:
                queryset = queryset.filter(date_start__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)
            count_failure = []
            total = queryset.count()
            for u in Failure.objects.all():
                data = []
                query = queryset.filter(failure=u)
                cost = 0
                try:
                    for q in query:
                        cost += q.get_cost()
                except:
                    pass
                percentage = float(query.count()) * 100 / float(total)
                count_failure.append({'label': u.name + " - " + str(percentage) + "%", 'data': query.count(),
                                      'backgroundColor': generate_color(), 'cost': cost})
            return Response({'count_failure': count_failure}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetGraphicsType(APIView):
    def get(self, request):
        try:
            queryset = WorkOrder.objects.filter(status=True)
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)

            if date_start and date_end:
                queryset = queryset.filter(date_start__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)
            count_type = []
            total = queryset.count()
            for u in Type.objects.all():
                query = queryset.filter(type_maintenance=u)
                cost = 0
                try:
                    for q in query:
                        cost += q.get_cost()
                except:
                    pass
                percentage = float(query.count()) * 100 / float(total)
                count_type.append({'label': u.name + " - " + str(percentage) + "%", 'data': query.count(),
                                   'backgroundColor': generate_color(), 'cost': cost})
            return Response({'count_type': count_type}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetGraphicsEquipment(APIView):
    def get(self, request):
        try:
            queryset = WorkOrder.objects.filter(status=True)
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)

            if date_start and date_end:
                queryset = queryset.filter(date_start__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)
            count_equipment = []
            total = queryset.count()
            for u in Physical.objects.all():
                query = queryset.filter(asset=u)
                cost = 0
                try:
                    for q in query:
                        cost += q.get_cost()
                except:
                    pass
                percentage = float(query.count()) * 100 / float(total)
                if query.count() > 0:
                    count_equipment.append({'label': u.name + " - " + str(percentage) + "%", 'data': query.count(),
                                            'backgroundColor': generate_color(), 'cost': cost})
            return Response({'count_equipment': count_equipment}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetGraphicsFacilities(APIView):
    def get(self, request):
        try:
            queryset = WorkOrder.objects.filter(status=True)
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)

            if date_start and date_end:
                queryset = queryset.filter(date_start__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)
            count_facilities = []
            total = queryset.count()
            for u in Fixed.objects.all():
                cost = 0
                count = 0
                for f in u.physicals.all():
                    query = queryset.filter(asset=f)
                    try:
                        for q in query:
                            cost += q.get_cost()
                    except:
                        pass
                    count += query.count()
                percentage = round(float(count * 100) / float(total), 2)
                if count > 0:
                    count_facilities.append({'label': u.name + " - " + str(percentage) + "%", 'data': count,
                                             'backgroundColor': generate_color(), 'cost': cost})

            return Response({'count_facilities': count_facilities}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetTotalOT(APIView):
    def get(self, request):
        try:
            queryset = WorkOrder.objects.filter()
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)

            if date_start and date_end:
                queryset = queryset.filter(date_start__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)

            finished = queryset.filter(status=True).count()
            pending = queryset.filter(status=False).count()
            total = finished + pending
            compliance = round(finished * 100 / total, 2)
            return Response({'finished': finished, 'pending': pending, 'compliance': compliance},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetIndicatorView(APIView):
    def get(self, request):
        try:
            queryset = WorkOrder.objects.filter(type_maintenance__name='Correctivo')
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)
            if date_start and date_end:
                queryset = queryset.filter(date_start__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date_report__month=datetime.now().month)

            data = []
            for p in Physical.objects.all():
                query = queryset.filter(asset=p)
                if query.count() > 0:
                    total = 0
                    query = query.order_by('date_report')
                    fallas_dt = [datetime.strptime(str(f.date_report), '%Y-%m-%d %H:%M:%S') for f in query]
                    deltas = [fallas_dt[i + 1] - fallas_dt[i] for i in range(len(fallas_dt) - 1)]

                    mtbf = sum(deltas, timedelta(0)) / len(deltas) if len(deltas) > 0 else timedelta(0)
                    text = str(mtbf)
                    mtbf = round(mtbf.total_seconds() / 3600, 2)
                    count = query.filter(status=True).count()
                    for f in query.filter(status=True):
                        total += f.get_time().total_seconds()
                    mttr = total / count if count > 0 else 0
                    text2 = str(timedelta(seconds=mttr))
                    mttr = round(mttr / 3600, 2)

                    available = round((mtbf - mttr) / mtbf * 100, 2) if mtbf > 0 else 0
                    execute = mtbf - mttr
                    reliability = round(math.exp(-execute / mtbf) if mtbf > 0 else 0, 2)

                    data.append({'label_mttr': p.name + " - " + text2 + " hrs", 'data_mttr': mttr,
                                 'label_mtbf': p.name + " - " + text + " hrs", 'data_mtbf': mtbf,
                                 'backgroundColor': generate_color(),
                                 'label_available': p.name + " - " + str(available) + "%", 'data_available': available,
                                 'label_reliability': p.name + " - " + str(reliability),
                                 'data_reliability': reliability})
            return Response({'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)





class GetCostDay(APIView):
    def get(self, request):
        try:
            queryset = WorkOrder.objects.filter(status=True)
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)
            range_date = []
            data = []
            if date_start and date_end:
                queryset = queryset.filter(date_start__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)
            for q in queryset.order_by('date_start'):
                if q.date_start.date() not in range_date:
                    range_date.append(q.date_start.date())
            for r in range_date:
                query = queryset.filter(date_start__date=r)
                total = 0
                result = []
                for q in query:
                    total += q.get_cost()
                    result.append(total)
                data.append({'label': r, 'data': result, 'backgroundColor': generate_color()})
            return Response({'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetTotalCostView(APIView):
    def get(self, request):
        try:
            queryset = WorkOrder.objects.filter(status=True)
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)
            data = []
            if date_start and date_end:
                queryset = queryset.filter(date_start__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)
            user = 0
            material = 0
            for q in queryset:
                user += q.get_cost_personnel()
                material += q.get_cost()
            resource = round(float(material) - float(user), 2)
            return Response({'user': user, 'material': resource}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetTableOTView(APIView):
    def get(self, request):
        try:
            queryset = WorkOrder.objects.filter(status=True)
            date_start = request.query_params.get('date_start', None)
            date_end = request.query_params.get('date_end', None)
            if date_start and date_end:
                queryset = queryset.filter(date_start__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(date_start__month=datetime.now().month)

            queryset = queryset.order_by('date_start')
            serializer = WorkOrderSerializer(queryset, many=True)

            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No work orders pending found', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
