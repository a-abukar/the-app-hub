import sys
import json

def calculate_permissions(data):
    owner = (4 if data['owner_read'] else 0) + (2 if data['owner_write'] else 0) + (1 if data['owner_execute'] else 0)
    group = (4 if data['group_read'] else 0) + (2 if data['group_write'] else 0) + (1 if data['group_execute'] else 0)
    public = (4 if data['public_read'] else 0) + (2 if data['public_write'] else 0) + (1 if data['public_execute'] else 0)

    octal = f"{owner}{group}{public}"
    symbolic = (f"{'r' if data['owner_read'] else '-'}{'w' if data['owner_write'] else '-'}{'x' if data['owner_execute'] else '-'}"
                f"{'r' if data['group_read'] else '-'}{'w' if data['group_write'] else '-'}{'x' if data['group_execute'] else '-'}"
                f"{'r' if data['public_read'] else '-'}{'w' if data['public_write'] else '-'}{'x' if data['public_execute'] else '-'}")
    
    return octal, symbolic

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        octal, symbolic = calculate_permissions(input_data)
        result = {"octal": octal, "symbolic": symbolic}
        print(json.dumps(result))  # Print result to stdout
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
